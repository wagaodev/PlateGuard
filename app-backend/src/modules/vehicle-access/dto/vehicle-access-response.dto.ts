import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type FeedbackType =
  | 'ALLOWED'
  | 'DENIED'
  | 'NOT_FOUND'
  | 'INVALID_PLATE'
  | 'SERVER_ERROR';

export class VehicleAccessResponseDto {
  @ApiProperty({
    enum: ['ALLOWED', 'DENIED', 'NOT_FOUND', 'INVALID_PLATE', 'SERVER_ERROR'],
  })
  feedbackType!: FeedbackType;

  @ApiProperty()
  allowed!: boolean;

  @ApiProperty()
  plate!: string;

  @ApiProperty()
  message!: string;

  @ApiPropertyOptional()
  reason?: string;

  @ApiPropertyOptional()
  ownerName?: string;

  @ApiPropertyOptional()
  vehicleType?: string;

  @ApiPropertyOptional()
  vehicleModel?: string;

  @ApiPropertyOptional()
  accessType?: string;
}
