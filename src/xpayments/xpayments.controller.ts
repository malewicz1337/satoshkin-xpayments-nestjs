import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { XpaymentsService } from './xpayments.service';
import { XPaymentWebhookDto } from './dto/xpayment-webhook.dto';
import { XPaymentValidationGuard } from 'src/guards/xpayment-validation.guard';

@Controller('xpayments')
export class XpaymentsController {
  constructor(private readonly xpaymentsService: XpaymentsService) {}

  @Post()
  @UseGuards(XPaymentValidationGuard)
  async processPayment(@Body() payload: XPaymentWebhookDto) {
    return await this.xpaymentsService.processPayment(payload);
  }
}
