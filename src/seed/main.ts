/* tslint:disable:no-console */

import { PhotoRepository } from './components/external/photo-repository';
import { reporters } from 'mocha';
import { Photo } from '../components/photo/photo.interface';
import { v4 } from 'uuid';
const settings = require('../settings.json');
const { exec } = require('child_process');
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { PhotoDTO } from './components/external/dto/main';

const databasename = 'resize-photos-challenge';
const mongoport = 5018;
const dumpfile = 'photos.json';

function seedDatabase() {
    const externalRepository = new PhotoRepository();

    externalRepository.getAll().then(externalPhotos => {
        const photosCallbacks = externalPhotos.images.map(x => new Promise<Photo>((resolve, reject) => {
            ///
            /// Get photo as base64
            ///
            return externalRepository.getByUrl(x.url).then((photoImage) => {
                return {
                    url: x.url,
                    image: photoImage,
                    imageBuffer: Buffer.from(photoImage, 'base64'),
                };
            }).then((p) => {
                return Promise.all([
                    sharp(p.imageBuffer)
                        .resize(320, 240)
                        .toBuffer(),
                    sharp(p.imageBuffer)
                        .resize(384, 288)
                        .toBuffer(),
                    sharp(p.imageBuffer)
                        .resize(640, 480)
                        .toBuffer(),
                ]).then(imageBuffers => {
                    resolve({
                        _id: v4().toString(),
                        url: x.url,
                        image: p.image,
                        small: imageBuffers[0].toString('base64'),
                        medium: imageBuffers[1].toString('base64'),
                        large: imageBuffers[2].toString('base64'),
                    } as Photo);
                }).catch(err => {
                    reject(err);
                });
            });
        }));

        Promise.all(photosCallbacks).then(photos => {
            console.log(photos);

            fs.writeFileSync(`./${dumpfile}`, JSON.stringify(photos), { encoding: 'utf8' });

            exec(`mongoimport --jsonArray --quiet --port ${mongoport} --db ${databasename} --collection photos --drop --file ${dumpfile}`,
                { cwd: process.cwd(), maxBuffer: 1024 * 1024 * 50 },
                (err) => {
                    if (err)
                        throw err;

                    console.log('Photos inserted on database');
                });
        }).catch(err => {
            console.error(err);
            throw err;
        });
    });
}

seedDatabase();
