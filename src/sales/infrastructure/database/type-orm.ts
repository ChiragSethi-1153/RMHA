import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from "src/common/ormconfig";

@Module({
    imports: [
        NestTypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => 
                dataSourceOptions(configService),
            inject: [ConfigService],
        }),
    ]
})
export class TypeOrmModule {}