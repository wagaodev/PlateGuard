import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

interface HealthStatus {
  status: string;
  timestamp: string;
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  check(): HealthStatus {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
