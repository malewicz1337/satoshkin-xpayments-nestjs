import { HttpStatus } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { XPaymentWebhookDto } from './dto/xpayment-webhook.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createSuccessResult } from './utils';

@Processor('xpayments')
export class XPaymentsConsumer extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<XPaymentWebhookDto>): Promise<any> {
    const { id, amount, metadata, status, date } = job.data;
    const user = await this.prisma.user.findUnique({
      where: { id: metadata.user_id },
    });
    if (!user) {
      return HttpStatus.NOT_FOUND;
    }

    const existingPayment = await this.prisma.payment.findUnique({
      where: { externalId: id.toString() },
    });
    if (existingPayment) {
      return HttpStatus.CONFLICT;
    }

    const result = await this.prisma.$transaction(async (prisma) => {
      await prisma.payment.create({
        data: {
          externalId: id.toString(),
          userId: metadata.user_id,
          amount,
          status,
          date: new Date(date),
        },
      });

      if (status === 'success') {
        await prisma.balance.upsert({
          where: { userId: metadata.user_id },
          update: { amount: { increment: amount } },
          create: { userId: metadata.user_id, amount },
        });
      }

      return true;
    });

    if (!result) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return createSuccessResult('Payment processed successfully');
  }
}
