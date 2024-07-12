import { Body, Controller, Post } from '@nestjs/common';
import { XpaymentsService } from './xpayments.service';
import { XPaymentWebhookDto } from './dto/xpayment-webhook.dto';

@Controller('xpayments')
export class XpaymentsController {
  constructor(private readonly xpaymentsService: XpaymentsService) {}

  @Post()
  async processPayment(@Body() payload: XPaymentWebhookDto) {
    return await this.xpaymentsService.processPayment(payload);
  }
}
