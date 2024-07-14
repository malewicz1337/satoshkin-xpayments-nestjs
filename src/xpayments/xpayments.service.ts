import { Injectable, Logger } from '@nestjs/common';
import { XPaymentWebhookDto } from './dto/xpayment-webhook.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, QueueEvents } from 'bullmq';

@Injectable()
export class XpaymentsService {
  private readonly logger = new Logger(XpaymentsService.name);
  private queueEvents: QueueEvents;

  constructor(
    @InjectQueue('xpayments') private readonly xpaymentsQueue: Queue,
  ) {
    this.queueEvents = new QueueEvents('xpayments');
    this.queueEvents.on('completed', ({ jobId, returnvalue }) => {
      this.logger.log(`Job ${jobId} has completed!`, returnvalue);
    });

    this.queueEvents.on('failed', ({ jobId, failedReason }) => {
      this.logger.log(`Job ${jobId} has failed!`, failedReason);
    });
  }

  async processPayment(payload: XPaymentWebhookDto): Promise<any> {
    const job = await this.xpaymentsQueue.add('processPayment', payload);
    const result = await job.waitUntilFinished(this.queueEvents);
    return result;
  }
}
