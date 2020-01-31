import { ApiProperty } from '@nestjs/swagger';
export class FindNearestTasksDto {
  @ApiProperty()
  // tslint:disable-next-line:no-any
  public readonly location!: number[];
  @ApiProperty()
  public readonly password!: number;
}
