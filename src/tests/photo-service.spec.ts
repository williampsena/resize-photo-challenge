import * as http from 'http';
import * as fs from 'fs';
import { expect } from 'chai';
import { Test } from '@nestjs/testing';
import { PhotoService } from '../components/photo/photo.service';
import { PhotoSchema } from '../components/photo/photo.schema';
const mongoose = require('mongoose');
const settings = require('../settings.json');

describe('PhotoService', () => {
    let photoService: PhotoService;
    let photoSchema;

    before((done) => {
        mongoose.connect(settings.database);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', () => {
            photoSchema = mongoose.model('Photo', PhotoSchema);
            photoService = new PhotoService(photoSchema);

            done();
        });
    });

    it('Get all photos', (done) => {
        photoService.findAll().then(photos => {
            expect(photos.length > 0, 'Error on get all photos');
            done();
        });
    });

    it('Get photo by Url', (done) => {
        photoService.find('b777_5.jpg').then(photo => {
            expect(photo.url, 'Error on get photo by Url');
            done();
        });
    });

    it('Resize image', (done) => {
        photoService.resize('b777_5.jpg', 320, 240, '').then(photoBuffer => {
            fs.writeFileSync('./.tmp/output_resized.jpg', photoBuffer, 'binary');
            expect(photoBuffer, 'Error on get photo by Url');
            done();
        });
    });
});