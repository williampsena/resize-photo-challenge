import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoSchema } from './photo.schema';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Photo', schema: PhotoSchema }])],
  controllers: [PhotoController],
  components: [PhotoService],
})
export class PhotoModule {}