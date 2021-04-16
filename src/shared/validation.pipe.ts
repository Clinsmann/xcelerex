import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  Injectable,
  ArgumentMetadata,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { serializeValidationError } from '../utils/serializeValidationError';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        'Validation failed: No body submitted',
        HttpStatus.BAD_REQUEST
      );
    }
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) return value;
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        { errors: serializeValidationError(errors) },
        HttpStatus.BAD_REQUEST
      );
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) return false;
    return true;
  }
}
