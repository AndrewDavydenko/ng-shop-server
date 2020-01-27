import { ApiHideProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiHideProperty()
  public readonly taskName!: string;
  @ApiHideProperty()
  public readonly location!: string;
  @ApiHideProperty()
  public password!: string;
}
