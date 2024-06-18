import {
  BadRequestException,
  Injectable,
  
} from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Batch } from './entities/batch.entity';
import { Product } from '../../products/entities/product.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { Location } from '../location/entities/location.entity';
import { BranchItem } from '../branch-items/entities/branch-item.entity';
import { LocationItem } from '../location-items/entities/location-item.entity';
import { CreateBatchTransferDTO } from './dto/create-batch-transfer.dto';

@Injectable()
export class BatchService {
  constructor(
    @InjectModel(Batch.name) private readonly batchModel: Model<Batch>,
    @InjectModel(Branch.name) private readonly branchModel: Model<Branch>,
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>, // Inject the Product model
    @InjectModel(BranchItem.name) private readonly branchItemModel: Model<BranchItem>, 
    @InjectModel(LocationItem.name) private readonly locationItemModel: Model<LocationItem>, 
  ) {}


  async create(createBatchDto: CreateBatchDto): Promise<Batch> {
    try {
      // Find the product associated with the batch
      const product = await this.productModel.findById(createBatchDto.item);
  
      if (!product) {
        throw new BadRequestException(`Product with ID ${createBatchDto.item} not found`);
      }
  
      let totalBranchQuantity = 0;
    let totalLocationQuantity = 0;

    // Calculate total quantity from branch quantities if provided
    if (createBatchDto.branch && createBatchDto.branch.length > 0) {
      totalBranchQuantity = createBatchDto.branch.reduce((sum, bq) => sum + bq.quantity, 0);
    }

    // Calculate total quantity from location quantities if provided
    if (createBatchDto.location && createBatchDto.location.length > 0) {
      totalLocationQuantity = createBatchDto.location.reduce((sum, lq) => sum + lq.quantity, 0);
    }

    // Validate if total quantities match the main quantity
    if ((totalBranchQuantity + totalLocationQuantity) > createBatchDto.quantity) {
      throw new BadRequestException('Total quantity in branch and location does not match main quantity');
    }

    // Calculate quantity left after allocating to branches and locations
    const quantityLeft = createBatchDto.quantity - (totalBranchQuantity + totalLocationQuantity);

    const createdBatch = new this.batchModel({
      ...createBatchDto,
      branch: createBatchDto.branch?.length ? createBatchDto.branch.map(bq => ({
        quantity: bq.quantity, // Ensure quantity is passed as a number
        branchId: bq.branchId,
        srp: createBatchDto.cost, // Set correct price per unit
        item: createBatchDto.item,
      })) : [{
        quantity: quantityLeft, // Ensure quantity is passed as a number
        branchId: createBatchDto.mainBranch,
        srp: createBatchDto.cost, // Set correct price per unit
        item: createBatchDto.item,
      }],
      location: createBatchDto.location?.map(lq => ({
        quantity: lq.quantity, // Ensure quantity is passed as a number
        locationId: lq.locationId || "",
        srp: createBatchDto.cost, // Set correct price per unit
        item: createBatchDto.item,
      })) || [],
    });
  
      // Save the new Batch document
      const savedBatch = await createdBatch.save();
       
      if(quantityLeft > 0){
        const main_branch = {
          quantity:quantityLeft,
          branchId:createBatchDto.mainBranch
        }
     console.log(main_branch)
        createBatchDto.branch.push(main_branch);
      }

      if(createBatchDto.branch){
      // Create or update BranchQuantity entities
      for (const bq of createBatchDto.branch) {
        const existingBranchItem = await this.branchItemModel.findOne({
          branch: bq.branchId,
          item: createBatchDto.item,
        });
  
        if (existingBranchItem) {
          // If branchItem already exists, update its quantity
          existingBranchItem.quantity += bq.quantity;
          existingBranchItem.batch.push(savedBatch._id as Types.ObjectId);
          await existingBranchItem.save();
        } else {
          // Otherwise, create a new branchItem
          const branchQuantity = new this.branchItemModel({
            quantity: bq.quantity,
            branch: bq.branchId,
            item: createBatchDto.item,
            batch: [savedBatch._id],
            srp: createBatchDto.cost, // Set correct price per unit
          });
          await branchQuantity.save();
       
        }
      }
    }
      if(createBatchDto.location){

      
      for (const lq of createBatchDto.location) {
        const existingBranchItem = await this.locationItemModel.findOne({
          location: lq.locationId,
          item: createBatchDto.item,
        });
  
        if (existingBranchItem) {
          // If branchItem already exists, update its quantity
          existingBranchItem.quantity += lq.quantity;
          existingBranchItem.batch.push(savedBatch._id as Types.ObjectId);
          await existingBranchItem.save();
        } else {
          // Otherwise, create a new branchItem
          const branchQuantity = new this.locationItemModel({
            quantity: lq.quantity,
            location: lq.locationId,
            item: createBatchDto.item,
            batch:[ savedBatch._id],
            srp: createBatchDto.cost, // Set correct price per unit
          });
          await branchQuantity.save();
        }
      }

    }
      // // Create LocationQuantity entities (assuming locationItems are unique per batch)
      // const locationQuantities = createBatchDto.location.map(async lq => {
      //   const locationQuantity = new this.locationItemModel({
      //     quantity: lq.quantity,
      //     location: lq.locationId,
      //     batchId: savedBatch._id,
      //     srp: createBatchDto.cost, // Set correct price per unit
      //     item: createBatchDto.item,
      //   });
      //   await locationQuantity.save();
      //   return locationQuantity;
      // });


      //Add the remaining to the main
      // const existingBranchItem = await this.branchItemModel.findOne({
      //   branch: createBatchDto.mainBranch,
      //   item: createBatchDto.item,
        
      // });

      // console.log({existingBranchItem})
      // if (existingBranchItem && createdBatch.branch.length != 0) {
      //   // If branchItem already exists, update its quantity
      //   existingBranchItem.quantity += quantityLeft;
      //   // existingBranchItem.batch.push(savedBatch._id as Types.ObjectId);
      //   await existingBranchItem.save();
      // } else {
      //   // Otherwise, create a new branchItem
      //   const branchQuantity = new this.branchItemModel({
      //     quantity: quantityLeft,
      //     branch: createBatchDto.mainBranch,
      //     item: createBatchDto.item,
      //     batch:[ savedBatch._id],
      //     srp: createBatchDto.cost, // Set correct price per unit
      //   });
      //   await branchQuantity.save();
      // }
  
      // Wait for all LocationQuantity entities to be created
      // await Promise.all(locationQuantities);
  
      return savedBatch;
    } catch (error) {
      throw new BadRequestException(`Failed to create batch: ${error.message}`);
    }
  }
  
  
  async findAll(): Promise<Batch[]> {
    return this.batchModel.find().populate('item').populate('branch').exec();
  }

  async findOne(id: string): Promise<Batch> {
    return this.batchModel
      .findById(id)
      .populate('item')
      .populate('branch')
      .exec();
  }

  async update(id: string, updateBatchDto: UpdateBatchDto): Promise<Batch> {
    return this.batchModel
      .findByIdAndUpdate(id, updateBatchDto, { new: true })
      .populate('item')
      .populate('branch')
      .exec();
  }

  async remove(id: string): Promise<Batch> {
    return this.batchModel.findByIdAndDelete(id).exec();
  }

  async findByProductAndBranch(productId: string, branchId: string): Promise<Batch[]> {
    try {
      const batches = await this.batchModel
        .find({
          item: productId,
          'branch':  branchId  
        })
        .populate('item') // Populate the 'item' field reference
        .exec();

      return batches;
    } catch (error) {
      throw new Error(`Failed to find batches: ${error.message}`);
    }
  }

  async transferItems (createTransferDTO:CreateBatchTransferDTO) {


    const currentBatchItem = await this.batchModel.findById(createTransferDTO.batchId)
    //check if branch or location first
    if(createTransferDTO.toType === "branch"){
   
      console.log({currentBatchItem})

      const newBatch = new this.batchModel({
        name:currentBatchItem.name,
        item:currentBatchItem.item,
        supplier:currentBatchItem.supplier,
        cost:currentBatchItem.cost,
        unit:currentBatchItem.unit,
        mfg:currentBatchItem.mfg,
        exp:currentBatchItem.exp,
        quantity: createTransferDTO.quantity,
        branch: {
          quantity: createTransferDTO.quantity, // Ensure quantity is passed as a number
          branchId: createTransferDTO.toBranch,
          srp: currentBatchItem.cost, // Set correct price per unit
          item: currentBatchItem.item,
        } ,
      
      })

       await newBatch.save()

      //get the brach item
   

      const branchItemTo = await this.branchItemModel.findOne({branch:createTransferDTO.toBranch});
 
      branchItemTo.quantity+= createTransferDTO.quantity;
      branchItemTo.batch.push(newBatch._id as Types.ObjectId);



      await branchItemTo.save();
      

      
      const branchItemFrom = await this.branchItemModel.findOne({ branch: createTransferDTO.fromBranchId });

      if (!branchItemFrom) {
        throw new Error('Branch item not found');
      }
    
      const newQuantity = branchItemFrom.quantity - createTransferDTO.quantity;
    
      if (newQuantity <= 0) {
        await branchItemFrom.deleteOne();
      } else {
      console.log({branchItemFrom})

        branchItemFrom.quantity= createTransferDTO.quantity;
        await branchItemFrom.save();

      console.log({branchItemFrom})
      }
   
      currentBatchItem.quantity -= createTransferDTO.quantity
     await currentBatchItem.save();
  
     console.log(currentBatchItem,newQuantity)
     
      return newBatch;
    }

  }
}
