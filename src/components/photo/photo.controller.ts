import { Controller, Get, Inject, Param, Body, HttpException, HttpStatus, Response, Res, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ParseSizePipe } from '../../pipes/parse-size';
import { PhotoSize } from '../../dto/size';
import { Photo } from './photo.interface';

@Controller('photo')
export class PhotoController {
  constructor( @Inject(PhotoService) private readonly photoService: PhotoService) { }

  @Get()
  async findAll() {
    return await this.photoService.findAll();
  }

  @Get(':photoIdOrUrl')
  async find( @Param() params) {
    const photoIdOrUrl: string = params.photoIdOrUrl;
    const photo = await this.photoService.find(photoIdOrUrl);

    if (!photo)
      throw new HttpException('Photo was not found', HttpStatus.NOT_FOUND);

    return photo;
  }

  @Get('image/:photoIdOrUrl')
  async image( @Param() params, @Res() res) {

    const photoIdOrUrl: string = params.photoIdOrUrl;
    const photo = await this.photoService.find(photoIdOrUrl);

    if (!photo)
      throw new HttpException('Photo was not found', HttpStatus.NOT_FOUND);

    res.setHeader('Content-Type', 'image/jpeg');
    return res.send(Buffer.from(photo.image, 'base64'));
  }

  @Get('image/:photoIdOrUrl/:size')
  async imageResize( @Param() params, @Param('size', new ParseSizePipe()) size: PhotoSize, @Res() res) {

    const photoIdOrUrl: string = params.photoIdOrUrl;
    const photoBuffer = await this.photoService.resize(photoIdOrUrl, size.width, size.height, size.alias);

    if (!photoBuffer)
      throw new HttpException('Photo was not found', HttpStatus.NOT_FOUND);

    res.setHeader('Content-Type', 'image/jpeg');
    return res.send(photoBuffer);
  }

  @Post()
  async create(@Body() photo: Photo) {
    try {
      return await this.photoService.createOrUpdate(photo);
    }
    catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}