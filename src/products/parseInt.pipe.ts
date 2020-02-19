import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseInt implements PipeTransform {
  public transform(value: string) {
    return parseInt(value, 10);
  }
}
