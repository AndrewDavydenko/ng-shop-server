import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty()
  public readonly fullName!: string;
  @ApiProperty()
  public readonly email!: string;
  @ApiProperty()
  public password!: string;
  @ApiProperty()
  public readonly address!: string;
  @ApiProperty()
  public readonly birthday!: Date;
  @ApiProperty()
  public readonly phone!: string;
  @ApiProperty()
  public readonly accessToken!: string;
  @ApiProperty()
  public code!: number;
}

// tslint:disable-next-line:max-classes-per-file
export class LoginDto {
  @ApiProperty()
  public readonly phone!: string;
  @ApiProperty()
  public readonly password!: string;
}
