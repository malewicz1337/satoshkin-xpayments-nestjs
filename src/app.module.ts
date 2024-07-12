import { Module } from '@nestjs/common';
import { XpaymentsModule } from './xpayments/xpayments.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    XpaymentsModule,
  ],
})
export class AppModule {}
