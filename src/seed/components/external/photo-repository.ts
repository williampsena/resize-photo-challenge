import { Component } from '@nestjs/common';
import * as http from 'http';
import { PhotoDTO } from './dto/main';

@Component()
export class PhotoRepository {
  getAll(): Promise<PhotoDTO> {
    return new Promise<PhotoDTO>((resolve, reject) => {
      http.get('http://54.152.221.29/images.json', (res) => {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => resolve(JSON.parse(body)));
      });
    });
  }

  getByUrl(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let data = [];

      http.get(url, (res) => {
        if (res.statusCode !== 200)
          throw Error(`Error on get image ${url}`);

        res.on('data',
          (chunk) => data.push(chunk)).on('end', () => resolve(Buffer.concat(data).toString('base64')));
      });
    });
  }
}