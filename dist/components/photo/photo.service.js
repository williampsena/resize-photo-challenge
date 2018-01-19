"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const photo_schema_1 = require("./photo.schema");
const http = require("http");
const https = require("https");
const sharp = require("sharp");
const uuid_1 = require("uuid");
const buffer_1 = require("buffer");
let PhotoService = class PhotoService {
    constructor(photoModel) {
        this.photoModel = photoModel;
    }
    createOrUpdate(model) {
        if (!model._id)
            model._id = uuid_1.v4();
        if (!model.image) {
            return this._getImageByUrl(model.url).then(imageData => {
                model.image = imageData;
            }).then(() => {
                let imageBuffer = buffer_1.Buffer.from(model.image, 'base64');
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
        }
        else {
            return this._save(model);
        }
    }
    _save(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPhoto = new this.photoModel(model);
            return createdPhoto.save();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.photoModel.find().exec();
        });
    }
    find(photoNameOrId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.photoModel.findOne({
                $or: [
                    { url: new RegExp(photoNameOrId) },
                    { _id: photoNameOrId },
                ],
            });
        });
    }
    resize(photoNameOrId, width, height, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const photo = yield this.find(photoNameOrId);
            if (!photo)
                return null;
            if (alias && photo[alias])
                return Promise.resolve(buffer_1.Buffer.from(photo[alias], 'base64'));
            let imageBuffer = buffer_1.Buffer.from(photo.image, 'base64');
            return yield sharp(imageBuffer)
                .resize(width, height)
                .toBuffer();
        });
    }
    _getImageByUrl(url) {
        if (url.indexOf('https') > -1)
            return this._getImageByUrlOnHttps(url);
        else
            return this._getImageByUrlOnHttp(url);
    }
    _getImageByUrlOnHttp(url) {
        return new Promise((resolve, reject) => {
            let data = [];
            http.get(url, (res) => {
                if (res.statusCode !== 200)
                    throw Error(`Error on get image ${url}`);
                res.on('data', (chunk) => data.push(chunk)).on('end', () => resolve(buffer_1.Buffer.concat(data).toString('base64')));
            }).on('error', (e) => reject(e));
        });
    }
    _getImageByUrlOnHttps(url) {
        return new Promise((resolve, reject) => {
            let data = [];
            https.get(url, (res) => {
                if (res.statusCode !== 200)
                    throw Error(`Error on get image ${url}`);
                res.on('data', (chunk) => data.push(chunk)).on('end', () => resolve(buffer_1.Buffer.concat(data).toString('base64')));
            }).on('error', (e) => reject(e));
        });
    }
};
PhotoService = __decorate([
    common_1.Component(),
    __param(0, mongoose_2.InjectModel(photo_schema_1.PhotoSchema)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PhotoService);
exports.PhotoService = PhotoService;
//# sourceMappingURL=photo.service.js.map