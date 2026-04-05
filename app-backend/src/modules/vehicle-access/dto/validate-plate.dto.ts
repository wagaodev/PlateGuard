import {
  IsString,
  IsNotEmpty,
  Matches,
  IsOptional,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ValidatePlateDto {
  @ApiProperty({
    example: 'BRA2E19',
    description: 'Placa no formato Mercosul (AAA0A00) ou antigo (AAA0000)',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, {
    message:
      'Formato de placa inválido. Use Mercosul (AAA0A00) ou antigo (AAA0000)',
  })
  plate!: string;

  @ApiPropertyOptional({
    example: 'CAMERA',
    enum: ['CAMERA', 'QR_CODE', 'MANUAL'],
    default: 'CAMERA',
  })
  @IsOptional()
  @IsString()
  @IsIn(['CAMERA', 'QR_CODE', 'MANUAL'])
  entryMethod?: string;
}
