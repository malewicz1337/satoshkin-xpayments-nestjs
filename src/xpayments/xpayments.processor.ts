import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { XPaymentWebhookDto } from './dto/xpayment-webhook.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Processor('xpayments')
export class XPaymentsConsumer extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<XPaymentWebhookDto>): Promise<any> {
    try {
      const { id, date, amount, metadata, status } = job.data;

      await this.prisma.payment.create({
        data: {
          externalId: id.toString(),
          userId: metadata.user_id,
          amount,
          status,
          date: new Date(date),
        },
      });

      if (status === 'success') {
        await this.prisma.balance.upsert({
          where: { userId: metadata.user_id },
          update: { amount: { increment: amount } },
          create: { userId: metadata.user_id, amount },
        });
        return {};
      }

      return {};
    } catch (error) {
      return {};
    }
  }
}
