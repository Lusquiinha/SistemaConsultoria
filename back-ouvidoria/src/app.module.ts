import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserController } from './users/user.controller';
import { UsersModule } from './users/user.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      username: 'postgres',
      password: 'senha123',
      database: 'ouvidoria',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
