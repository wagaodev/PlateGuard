import {
  IsString,
  IsNotEmpty,
  Matches,
  IsOptional,
  IsIn,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ example: 'BRA2E19' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, {
    message: 'Formato de placa inválido',
  })
  plate!: string;

  @ApiProperty({ example: 'Wagner Barboza' })
  @IsString()
  @IsNotEmpty()
  ownerName!: string;

  @ApiPropertyOptional({ example: 'car', enum: ['car', 'truck', 'motorcycle'] })
  @IsOptional()
  @IsString()
  @IsIn(['car', 'truck', 'motorcycle'])
  vehicleType?: string;

  @ApiPropertyOptional({ example: 'Honda Civic' })
  @IsOptional()
  @IsString()
  vehicleModel?: string;

  @ApiPropertyOptional({ example: 'Prata' })
  @IsOptional()
  @IsString()
  vehicleColor?: string;

  @ApiPropertyOptional({ example: 'resident', enum: ['resident', 'visitor', 'blocked'] })
  @IsOptional()
  @IsString()
  @IsIn(['resident', 'visitor', 'blocked'])
  accessType?: string;

  @ApiPropertyOptional({ example: true, description: 'Gerar QR Code para o veículo' })
  @IsOptional()
  @IsBoolean()
  generateQrCode?: boolean;
}
