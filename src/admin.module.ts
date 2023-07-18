import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule, Module } from '@nestjs/common';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Specialization } from './specialization/entities/specialization.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, HttpModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService,
      ): Partial<PostgresConnectionOptions> => ({
        type: 'postgres',
        host: '203.175.11.205',
        port: 5432,
        username: 'admin',
        password: 'dimedicadmin',
        database: 'dimedic',
        entities: [
          Specialization,
        ],
        synchronize: false,
      }),
    }),
  ]
})
export class AdminModule {}
