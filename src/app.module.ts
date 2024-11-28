import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from './common/ormconfig';
import { SalesModule } from './sales/sales.module';
import { TypeOrmModule } from './common/type-orm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule,
    SalesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
