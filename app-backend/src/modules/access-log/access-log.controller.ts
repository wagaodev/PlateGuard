import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AccessLogService } from './access-log.service';

@ApiTags('access-logs')
@Controller('access-logs')
export class AccessLogController {
  constructor(private readonly service: AccessLogService) {}

  @Get()
  @ApiOperation({ summary: 'Listar histórico de acessos' })
  @ApiQuery({ name: 'plate', required: false, description: 'Filtrar por placa' })
  async findAll(@Query('plate') plate?: string) {
    if (plate) {
      return this.service.getByPlate(plate.toUpperCase());
    }
    return this.service.getAll();
  }
}
