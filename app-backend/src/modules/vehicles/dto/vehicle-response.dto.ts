import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VehicleResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  plate!: string;

  @ApiProperty()
  ownerName!: string;

  @ApiProperty()
  vehicleType!: string;

  @ApiPropertyOptional()
  vehicleModel?: string | null;

  @ApiPropertyOptional()
  vehicleColor?: string | null;

  @ApiProperty()
  accessType!: string;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  qrCodeToken?: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
