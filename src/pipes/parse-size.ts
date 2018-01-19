
import { PipeTransform, Pipe, ArgumentMetadata, HttpStatus, BadRequestException } from '@nestjs/common';
import { PhotoSize } from '../dto/size';

@Pipe()
export class ParseSizePipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
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
      throw new BadRequestException('Size is invalid');
    }

    return new PhotoSize(
      parseInt(result[1].toString(), 0),
      parseInt(result[2].toString(), 0),
      sizeAlias);
  }
}