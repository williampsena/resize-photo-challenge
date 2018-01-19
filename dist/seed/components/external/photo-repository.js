"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const http = require("http");
let PhotoRepository = class PhotoRepository {
    getAll() {
        return new Promise((resolve, reject) => {
            http.get('http://54.152.221.29/images.json', (res) => {
                res.setEncoding('utf8');
                let body = '';
                res.on('data', (chunk) => { body += chunk; });
                res.on('end', () => resolve(JSON.parse(body)));
            });
        });
    }
    getByUrl(url) {
        return new Promise((resolve, reject) => {
            let data = [];
            http.get(url, (res) => {
                if (res.statusCode !== 200)
                    throw Error(`Error on get image ${url}`);
                res.on('data', (chunk) => data.push(chunk)).on('end', () => resolve(Buffer.concat(data).toString('base64')));
            });
        });
    }
};
PhotoRepository = __decorate([
    common_1.Component()
], PhotoRepository);
exports.PhotoRepository = PhotoRepository;
//# sourceMappingURL=photo-repository.js.map