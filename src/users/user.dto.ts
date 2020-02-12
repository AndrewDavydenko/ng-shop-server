import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  public readonly username!: string;
  @ApiProperty()
  public readonly email!: string;
  @ApiProperty()
  public password!: string;
  public readonly accessToken!: string;
}

// tslint:disable-next-line:max-classes-per-file
export class LoginDto {
  @ApiProperty()
  public readonly username!: string;
  @ApiProperty()
  public readonly password!: string;
}
