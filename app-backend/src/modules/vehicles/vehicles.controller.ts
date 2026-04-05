import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleResponseDto } from './dto/vehicle-response.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly service: VehiclesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar veículo' })
  @ApiResponse({
    status: 201,
    description: 'Veículo criado',
    type: VehicleResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Placa já cadastrada' })
  async create(@Body() dto: CreateVehicleDto): Promise<VehicleResponseDto> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os veículos' })
  @ApiResponse({ status: 200, type: [VehicleResponseDto] })
  async findAll(): Promise<VehicleResponseDto[]> {
    return this.service.findAll();
  }

  @Get(':plate')
  @ApiOperation({ summary: 'Buscar veículo por placa' })
  @ApiResponse({ status: 200, type: VehicleResponseDto })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  async findByPlate(
    @Param('plate') plate: string,
  ): Promise<VehicleResponseDto> {
    return this.service.findByPlate(plate);
  }

  @Delete(':plate')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover veículo por placa' })
  @ApiResponse({ status: 204, description: 'Veículo removido' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  async deleteByPlate(@Param('plate') plate: string): Promise<void> {
    await this.service.deleteByPlate(plate);
  }
}
