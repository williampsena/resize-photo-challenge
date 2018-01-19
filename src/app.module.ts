import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoModule } from './components/photo/photo.modules';
import { HomeModule } from './components/home/home.modules';

const settings = require('./settings.json');

@Module({
  imports: [MongooseModule.forRoot(settings.database), HomeModule, PhotoModule],
})
export class ApplicationModule { }
