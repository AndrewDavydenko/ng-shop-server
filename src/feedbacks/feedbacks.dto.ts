import { ApiProperty } from '@nestjs/swagger';

export class FeedbackDto {
  @ApiProperty()
  public readonly idProduct!: string;
  @ApiProperty()
  public readonly idUser!: string;
  @ApiProperty()
  public readonly rate!: number;
  @ApiProperty()
  public readonly advantages!: string;
  @ApiProperty()
  public readonly limitations!: string;
  @ApiProperty()
  public readonly description!: string;
}
