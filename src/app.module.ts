import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RequestService } from './request.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guards';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { AbilityModule } from './modules/ability/ability.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './modules/roles/roles.module';

import { ActionsModule } from './modules/actions/actions.module';
import { DebitsModule } from './modules/debits/debits.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { TaxsModule } from './modules/settings/taxs/taxs.module';
import { SalesModule } from './modules/sales/sales.module';
import { BusinessModule } from './modules/settings/business/business.module';

import { BranchModule } from './modules/branch/branch.module';

import { NfcManagerModule } from './modules/nfc-manager/nfc-manager.module';
import { CardAccountModule } from './modules/card-account/card-account.module';
import { TransactionHistoryModule } from './modules/transaction-history/transaction-history.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ellot:BananaPogi10okok@cluster0.kqlanl5.mongodb.net/pos'),
    UsersModule,
    AuthModule,
    AbilityModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    RolesModule,
    ActionsModule,
    DebitsModule,
    InvoicesModule,
    TaxsModule,
    SalesModule,
    BusinessModule,
    BranchModule,
    NfcManagerModule,
    CardAccountModule,
    TransactionHistoryModule,
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
      scope: Scope.REQUEST,
    },

    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
