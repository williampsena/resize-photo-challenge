import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeController } from './home.controller';

@Module({
  imports: [],
  controllers: [HomeController],
  components: [],
})
export class HomeModule {}