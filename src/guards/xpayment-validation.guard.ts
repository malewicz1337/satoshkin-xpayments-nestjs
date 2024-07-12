import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class XPaymentValidationGuard implements CanActivate {
  private readonly logger = new Logger(XPaymentValidationGuard.name);
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = request.body;

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.metadata.user_id },
      });
      if (!user) {
        throw new Error('User not found');
      }

      const existingPayment = await this.prisma.payment.findUnique({
        where: { externalId: payload.id.toString() },
      });
      if (existingPayment) {
        throw new Error('Payment already exists');
      }

      return true;
    } catch (error) {
      this.logger.error('Payment validation failed:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
