import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './task/tasks.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { SmsService } from './shared/services/sms.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE'),
      }),
    }),
    UsersModule,
    TasksModule,
    AuthModule,
    CategoriesModule,
  ],
  providers: [AppService, SmsService],
})
export class AppModule {}
