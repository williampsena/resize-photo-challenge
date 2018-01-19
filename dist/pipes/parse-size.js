"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const size_1 = require("../dto/size");
let ParseSizePipe = class ParseSizePipe {
    transform(value, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            let sizeExpression = value;
            const fixedSizes = {
                small: '320x240',
                medium: '384x288',
                large: '640x480',
            };
            let fixedSize = fixedSizes[value];
            let sizeAlias = '';
            if (fixedSize != null) {
                sizeExpression = fixedSize;
                sizeAlias = value;
            }
            const sizeRegex = /(\d+)[x](\d+)/;
            const result = sizeRegex.exec(sizeExpression);
            if (!result) {
                throw new common_1.BadRequestException('Size is invalid');
            }
            return new size_1.PhotoSize(parseInt(result[1].toString(), 0), parseInt(result[2].toString(), 0), sizeAlias);
        });
    }
};
ParseSizePipe = __decorate([
    common_1.Pipe()
], ParseSizePipe);
exports.ParseSizePipe = ParseSizePipe;
//# sourceMappingURL=parse-size.js.map