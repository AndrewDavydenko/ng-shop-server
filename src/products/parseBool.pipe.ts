import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseBool implements PipeTransform {
  public transform(value: string) {
    if (value === 'true') {
      return true;
    }
    return false;
  }
}
