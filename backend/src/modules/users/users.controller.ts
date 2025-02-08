import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode,
  UseGuards,
  InternalServerErrorException,
  ConflictException,
  Logger
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);


  // Rota pública para criar usuário (registro)
  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
      try {
          this.logger.log(`Iniciando criação de usuário: ${createUserDto.email}`);
          
          const { password, ...user } = await this.usersService.create(createUserDto);
          
          this.logger.log(`Usuário criado com sucesso: ${user.email}`);
          return user;
      } catch (error) {
          if (error instanceof ConflictException) {
              this.logger.warn(`Tentativa de criar usuário com email duplicado: ${createUserDto.email}`);
              throw error;
          }
          this.logger.error(`Erro ao criar usuário: ${error.message}`, error.stack);
          throw new InternalServerErrorException('Erro ao criar usuário');
      }
  }

  // Rotas protegidas
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}