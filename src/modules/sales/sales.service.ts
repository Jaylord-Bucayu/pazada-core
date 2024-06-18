import { Injectable, Logger } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from './entities/sale.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name) 
  constructor(
    @InjectModel(Sale.name) private readonly saleModel: Model<Sale>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const sale = new this.saleModel(createSaleDto);
    return sale.save();
  }

 async findAll() {
    return await this.saleModel.find().populate('customer salesPerson').exec();
  }

  async findOne(id: number) {
    return await this.saleModel.findById(id).populate('customer salesPerson').exec();
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    return await this.saleModel.findByIdAndUpdate(id,updateSaleDto).exec();
  }

  async remove(id: number) {
    return await this.saleModel.findByIdAndDelete(id).exec();
  }

  
  async getCustomerPurchased(id: string) {
    const purchases = await this.saleModel.find({ customer: id }).exec();

    const employee = await this.userModel.findById(id);

    // Calculate the total number of items sold
    const totalItemsSold = purchases.reduce((total, purchase) => total + purchase.number_of_items_sold, 0);

    const totalCreditSpent = purchases.reduce((total, purchase) => total + purchase.creditDeduction, 0);

  
    // Return the purchases and the total number of items sold
    return  [employee,
      totalItemsSold,
      totalCreditSpent]
    
  }

  async getAllCustomerPurchases() {
    // Retrieve all sales and populate customer details
    const purchases = await this.saleModel.find().populate('customer').exec();

    // Group purchases by customer and sum the total number of items sold and credit deduction per customer
    const customerPurchases = purchases.reduce((acc, purchase) => {
      const customer = purchase.customer as unknown as User;

      const customerId = customer?._id.toString();
      console.log(customerId)

      if (!acc[customerId]) {
        acc[customerId] = {
          customerCode:customer?.customer_code,
          customerId: customerId,
          credit_left:customer?.credit_left,
          firstName: customer?.firstname,
          lastName: customer?.lastname,
          purchases: [],
          totalItemsSold: 0,
          departmentRole:customer?.departmentRole,
          totalCreditDeduction: 0,
          totalPurchased:0,
          department:customer?.department
        };
      }
      acc[customerId].purchases.push(purchase);
      acc[customerId].totalItemsSold += purchase.number_of_items_sold;
      acc[customerId].totalCreditDeduction += purchase.creditDeduction;
      acc[customerId].totalPurchased += purchase.totalAmount;
      return acc;
    }, {});

    // Convert the result to an array
    return Object.values(customerPurchases);
  }


  
   formatDate(date: Date) {
    return date.toISOString();
  }

  async getRevenue(start: any, end: any) {

   

    const sales = await this.saleModel.find({
      createdAt: { $gte: start, $lte: end },
    }).exec();

   
   

    const dailyRevenue = sales.reduce((acc, sale:any) => {
      const date = sale?.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += sale.totalAmount;
      return acc;
    }, {});

    const data = Object.keys(dailyRevenue).map(date => ({
      date: new Date(date).toISOString(),
      value: dailyRevenue[date],
    }));

    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return {
      data,
      trend: 0, // You can implement trend calculation logic here
      total,
    };
  }


  async getOrders(start: any, end: any) {

  
    const sales = await this.saleModel.find({
      createdAt: { $gte: start, $lte: end },
    }).exec();

   

    const dailyRevenue = sales.reduce((acc, sale:any) => {
      const date = sale?.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += sale.number_of_items_sold;
      return acc;
    }, {});

    const data = Object.keys(dailyRevenue).map(date => ({
      date: new Date(date).toISOString(),
      value: dailyRevenue[date],
    }));

    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return {
      data,
      trend: 0, // You can implement trend calculation logic here
      total,
    };
  }
  
  private calculateTrend(formattedSales: { date: string; value: number }[]) {
    if (formattedSales.length < 2) return 0; // Return 0 if there are fewer than 2 data points
    const lastDay = formattedSales[formattedSales.length - 1].value; // Get the revenue of the last day
    const secondLastDay = formattedSales[formattedSales.length - 2].value; // Get the revenue of the second last day
    return lastDay - secondLastDay; // Calculate trend
  }
  
  


}
