import { ApiProperty } from '@nestjs/swagger';

export class VehicleLookupResponseDto {
  @ApiProperty({ example: 'BRA2E19' })
  plate!: string;

  @ApiProperty({ example: 'Honda' })
  brand!: string;

  @ApiProperty({ example: 'Civic EXL 2.0' })
  model!: string;

  @ApiProperty({ example: 2021 })
  year!: number;

  @ApiProperty({ example: 'Prata' })
  color!: string;

  @ApiProperty({ example: 'Wagner Barboza Goulart' })
  owner!: string;

  @ApiProperty({ example: 'Flex' })
  fuelType!: string;

  @ApiProperty({ example: 'Gravataí' })
  city!: string;

  @ApiProperty({ example: 'RS' })
  state!: string;

  @ApiProperty({ example: '9BWZZZ377VT004251' })
  chassi!: string;

  @ApiProperty({ example: '12345678901' })
  renavam!: string;
}
