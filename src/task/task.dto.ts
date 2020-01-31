import { ApiProperty } from '@nestjs/swagger';
export class TaskDto {
  @ApiProperty()
  public readonly castomer!: string;
  @ApiProperty()
  public readonly category!: string;
  @ApiProperty()
  public readonly duration!: number;
  @ApiProperty()
  public readonly equipment!: string;
  @ApiProperty()
  public readonly exequtor!: string;
  @ApiProperty()
  public readonly rate!: number;
  @ApiProperty()
  public readonly startDate!: Date;
  @ApiProperty()
  public readonly name!: string;
  @ApiProperty()
  public readonly where!: string;
}

// tslint:disable-next-line:max-classes-per-file
export class FindNearestTasksDto {
  @ApiProperty()
  public readonly location!: number[];
  @ApiProperty()
  public readonly password!: number;
}
