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

}
