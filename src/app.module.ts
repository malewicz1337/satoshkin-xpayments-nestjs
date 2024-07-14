import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { XpaymentsModule } from './xpayments/xpayments.module';
import { WhitelistMiddleware } from './middleware/whitelist.middleware';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    XpaymentsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WhitelistMiddleware)
      .forRoutes({ path: 'xpayments', method: RequestMethod.ALL });
  }
}
