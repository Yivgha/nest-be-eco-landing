import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { DealsModule } from './deals/deals.module';
import { Deal } from './deals/entities/deal.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // destination folder where uploaded files will be stored
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // specify the directory path
      serveRoot: '/uploads', // specify the base URL
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: parseInt(configService.get('PG_PORT')),
        username: configService.get('PG_USER'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DATABASE'),
        entities: [User, Deal],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    DealsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigModule],
})
export class AppModule {}
