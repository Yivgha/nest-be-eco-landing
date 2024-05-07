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
      dest: './src/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('DATABASE_URL'),
        type: 'postgres',
        ssl: {
          rejectUnauthorized: false,
        },
        synchronize: true,
        autoLoadEntities: true,
        entities: [User, Deal],
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
