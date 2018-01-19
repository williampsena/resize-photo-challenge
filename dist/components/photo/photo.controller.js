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
const common_1 = require("@nestjs/common");
const photo_service_1 = require("./photo.service");
const parse_size_1 = require("../../pipes/parse-size");
const size_1 = require("../../dto/size");
let PhotoController = class PhotoController {
    constructor(photoService) {
        this.photoService = photoService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.photoService.findAll();
        });
    }
    find(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const photoIdOrUrl = params.photoIdOrUrl;
            const photo = yield this.photoService.find(photoIdOrUrl);
            if (!photo)
                throw new common_1.HttpException('Photo was not found', common_1.HttpStatus.NOT_FOUND);
            return photo;
        });
    }
    image(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const photoIdOrUrl = params.photoIdOrUrl;
            const photo = yield this.photoService.find(photoIdOrUrl);
            if (!photo)
                throw new common_1.HttpException('Photo was not found', common_1.HttpStatus.NOT_FOUND);
            res.setHeader('Content-Type', 'image/jpeg');
            return res.send(Buffer.from(photo.image, 'base64'));
        });
    }
    imageResize(params, size, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const photoIdOrUrl = params.photoIdOrUrl;
            const photoBuffer = yield this.photoService.resize(photoIdOrUrl, size.width, size.height, size.alias);
            if (!photoBuffer)
                throw new common_1.HttpException('Photo was not found', common_1.HttpStatus.NOT_FOUND);
            res.setHeader('Content-Type', 'image/jpeg');
            return res.send(photoBuffer);
        });
    }
    create(photo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.photoService.createOrUpdate(photo);
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "findAll", null);
__decorate([
    common_1.Get(':photoIdOrUrl'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "find", null);
__decorate([
    common_1.Get('image/:photoIdOrUrl'),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "image", null);
__decorate([
    common_1.Get('image/:photoIdOrUrl/:size'),
    __param(0, common_1.Param()), __param(1, common_1.Param('size', new parse_size_1.ParseSizePipe())), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, size_1.PhotoSize, Object]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "imageResize", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "create", null);
PhotoController = __decorate([
    common_1.Controller('photo'),
    __param(0, common_1.Inject(photo_service_1.PhotoService)),
    __metadata("design:paramtypes", [photo_service_1.PhotoService])
], PhotoController);
exports.PhotoController = PhotoController;
//# sourceMappingURL=photo.controller.js.map