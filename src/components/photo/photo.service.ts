import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PhotoSchema } from './photo.schema';
import { Photo } from './photo.interface';
import * as http from 'http';
import * as https from 'https';
import * as sharp from 'sharp';
import { v4 } from 'uuid';
import { Buffer } from 'buffer';

@Component()
export class PhotoService {
  constructor( @InjectModel(PhotoSchema) private readonly photoModel: Model<Photo>) { }

  createOrUpdate(model: Photo): Promise<Photo> {
    if (!model._id)
      model._id = v4();

    if (!model.image) {
      return this._getImageByUrl(model.url).then(imageData => {
        model.image = imageData;
      }).then(() => {
        let imageBuffer = Buffer.from(model.image, 'base64');

        return Promise.all([
          sharp(imageBuffer)
            .resize(384, 288)
            .toBuffer(),
          sharp(imageBuffer)
            .resize(640, 480)
            .toBuffer(),
          sharp(imageBuffer)
            .resize(320, 240)
            .toBuffer(),
        ]).then(imageBuffers => {
          model.small = imageBuffers[0].toString('base64');
          model.medium = imageBuffers[1].toString('base64');
          model.large = imageBuffers[2].toString('base64');

          return model;
        });
      }).then(() => {
        return this._save(model);
      });
    } else {
      return this._save(model);
    }
  }

  private async _save(model: Photo): Promise<Photo> {
    const createdPhoto = new this.photoModel(model);
    return createdPhoto.save();
  }

  async findAll(): Promise<Photo[]> {
    return await this.photoModel.find().exec();
  }

  async find(photoNameOrId: string): Promise<Photo> {
    return await this.photoModel.findOne({
      $or: [
        { url: new RegExp(photoNameOrId) },
        { _id: photoNameOrId },
      ],
    });
  }

  async resize(photoNameOrId: string, width: number, height: number, alias: string): Promise<Buffer> {
    const photo = await this.find(photoNameOrId);

    if (!photo)
      return null;

    if (alias && photo[alias])
      return Promise.resolve(Buffer.from(photo[alias], 'base64'));

    let imageBuffer = Buffer.from(photo.image, 'base64');

    return await sharp(imageBuffer)
      .resize(width, height)
      .toBuffer();
  }

  private _getImageByUrl(url: string): Promise<string> {
    if (url.indexOf('https') > -1)
      return this._getImageByUrlOnHttps(url);
    else
      return this._getImageByUrlOnHttp(url);
  }

  private _getImageByUrlOnHttp(url: string): Promise<string> {

    return new Promise<string>((resolve, reject) => {
      let data = [];

      http.get(url, (res) => {
        if (res.statusCode !== 200)
          throw Error(`Error on get image ${url}`);

        res.on('data',
          (chunk) => data.push(chunk)).on('end', () => resolve(Buffer.concat(data).toString('base64')));
      }).on('error', (e) => reject(e));
    });
  }

  private _getImageByUrlOnHttps(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let data = [];

      https.get(url, (res) => {
        if (res.statusCode !== 200)
          throw Error(`Error on get image ${url}`);

        res.on('data',
          (chunk) => data.push(chunk)).on('end', () => resolve(Buffer.concat(data).toString('base64')));
      }).on('error', (e) => reject(e));
    });
  }
}