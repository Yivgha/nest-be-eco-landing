import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // destination folder where uploaded files will be stored
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // specify the directory path
      serveRoot: '/uploads', // specify the base URL
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [User, Deal],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    DealsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
