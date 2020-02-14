import { ApiProperty } from '@nestjs/swagger';

export class CategotyDto {
  @ApiProperty()
  public readonly name!: string;
}
