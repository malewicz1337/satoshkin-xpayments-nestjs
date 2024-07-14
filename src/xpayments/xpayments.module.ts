import { Module } from '@nestjs/common';
import { XpaymentsService } from './xpayments.service';
import { XpaymentsController } from './xpayments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BullModule } from '@nestjs/bullmq';
import { XPaymentsConsumer } from './xpayments.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'xpayments',
    }),
    PrismaModule,
  ],
  providers: [XpaymentsService, XPaymentsConsumer],
  controllers: [XpaymentsController],
})
export class XpaymentsModule {}
