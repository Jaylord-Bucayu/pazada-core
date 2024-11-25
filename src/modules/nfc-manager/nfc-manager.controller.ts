import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { NfcManagerService } from './nfc-manager.service';
import { TransferBalanceDto } from './dto/transfer-balance.dto';
import { PayBalanceDto } from './dto/pay-balance.dto';

@Controller('nfc-manager')
export class NfcManagerController {
  constructor(private readonly nfcManagerService: NfcManagerService) {}

  // Check balance for a customer
  @Get('balance/:customerId')
  async checkBalance(@Param('customerId') customerId: string) {
    return await this.nfcManagerService.checkBalance(customerId);
  }

  // Transfer balance between two customers
  @Post('transfer')
  async transferBalance(@Body() transferBalanceDto: TransferBalanceDto) {
    const { fromCustomerId, toCustomerId, amount } = transferBalanceDto;

    if (amount <= 0) {
      throw new BadRequestException('Transfer amount must be greater than zero');
    }

    return await this.nfcManagerService.transferBalance(fromCustomerId, toCustomerId, amount);
  }


  @Post('pay')
  async payAmount(@Body() transferBalanceDto: PayBalanceDto) {
    const { customer_id, amount } = transferBalanceDto;

    if (amount <= 0) {
      throw new BadRequestException('Transfer amount must be greater than zero');
    }

    return await this.nfcManagerService.payAmount(customer_id, amount);
  }



  @Post('add-balance')
  async addBalance(
    @Body('customer_id') customerId: string,
    @Body('amount') amount: number,
  ) {
    return await this.nfcManagerService.addBalance(customerId, amount);
  }



  @Post('encryptData')
 async encryptData(@Body() data: any) {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('Data to encrypt is required');
    }

    const encryptedData = await this.nfcManagerService.encryptData(data);
    console.log({encryptedData})
    return { encryptedData };
  }

  @Post('decryptData')
  decryptData(@Body('encryptedData') encryptedData: string) {
    if (!encryptedData) {
      throw new BadRequestException('Encrypted data is required');
    }
    console.log(encryptedData)
    const decryptedData = this.nfcManagerService.decryptData(encryptedData);
    return { decryptedData };
  }
}
/* const data = {
      C: 123,
      I: 500,
      B: 1500,
      S: 543,
      P: 0,
      T: 1731583838,
      A: 1,
      H: "08b5d41b0a01ec8fe5dc03b61ed438ee"
    }; */