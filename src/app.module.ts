import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { XpaymentsModule } from './xpayments/xpayments.module';
import { WhitelistMiddleware } from './middleware/whitelist.middleware';

@Module({
  imports: [XpaymentsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WhitelistMiddleware)
      .forRoutes({ path: 'xpayments', method: RequestMethod.ALL });
  }
}
