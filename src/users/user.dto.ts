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
  public readonly birthday!: string;
  @ApiProperty()
  public readonly phone!: string;
  @ApiProperty()
  public readonly avatar!: string;
  public readonly accessToken!: string;
  public code!: number;
}

// tslint:disable-next-line:max-classes-per-file
export class LoginDto {
  @ApiProperty()
  public readonly phone!: string;
  @ApiProperty()
  public readonly password!: string;
}

// tslint:disable-next-line:max-classes-per-file
export class CheckUniqueCode {
  @ApiProperty()
  public readonly code!: number;
}
