import { Module } from '@nestjs/common';
import { XpaymentsService } from './xpayments.service';
import { XpaymentsController } from './xpayments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [XpaymentsService],
  controllers: [XpaymentsController],
})
export class XpaymentsModule {}
