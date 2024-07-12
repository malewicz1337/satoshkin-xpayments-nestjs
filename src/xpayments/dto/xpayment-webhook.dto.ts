import {
  IsNumber,
  IsString,
  IsDateString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Metadata {
  @IsNumber()
  user_id: number;
}

export class XPaymentWebhookDto {
  @IsNumber()
  id: number;

  @IsDateString()
  date: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Metadata)
  metadata: Metadata;

  @IsString()
  status: 'success' | 'failed';

  @IsNumber()
  amount: number;
}
