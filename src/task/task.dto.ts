import { ApiProperty } from '@nestjs/swagger';
export class TaskDto {
  @ApiProperty()
  public readonly castomer!: string;
  @ApiProperty()
  public readonly category!: string;
  @ApiProperty()
  public readonly endDate!: Date;
  @ApiProperty()
  public readonly equipment!: string;
  @ApiProperty()
  public readonly exequtor!: string;
  @ApiProperty()
  public readonly rate!: number;
  @ApiProperty()
  public readonly startDate!: Date;
  @ApiProperty()
  public readonly taskName!: string;
  @ApiProperty()
  public readonly where!: string;
}
