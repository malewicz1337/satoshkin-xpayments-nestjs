import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { XPaymentWebhookDto } from './dto/xpayment-webhook.dto';
import { createErrorResult, createSuccessResult } from './utils';

@Injectable()
export class XpaymentsService {
  private readonly logger = new Logger(XpaymentsService.name);
  constructor(@InjectQueue('xpayments') private xpaymentsQueue: Queue) {}

  async processPayment(payload: XPaymentWebhookDto): Promise<any> {
    try {
      const job = await this.xpaymentsQueue.add('process', payload, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      });

      this.logger.log(`Payment queued for processing. Job ID: ${job.id}`);
      return createSuccessResult('Payment queued for processing');
    } catch (error) {
      this.logger.error('Error queueing payment:', error);
      return createErrorResult('Internal server error');
    }
  }
}
