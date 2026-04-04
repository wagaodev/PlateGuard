import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateQrDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Token UUID do QR Code do veículo',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  token!: string;
}
