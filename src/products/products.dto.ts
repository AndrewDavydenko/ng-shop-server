import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  public readonly name!: string;
  @ApiProperty()
  public readonly description!: string;
  @ApiProperty()
  public readonly price!: number;
  @ApiProperty()
  public readonly status!: boolean;
}
