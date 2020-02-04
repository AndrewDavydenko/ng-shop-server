import { ApiProperty } from '@nestjs/swagger';
export class CategoryDto {
  @ApiProperty()
  public readonly name!: string;
}
