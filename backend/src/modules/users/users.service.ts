import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  private readonly logger = new Logger(UsersService.name, {
    timestamp: true,
  });

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Verificando existência do email: ${createUserDto.email}`);
    
    const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      this.logger.warn(`Email já existe: ${createUserDto.email}`);
      throw new ConflictException('Falha no registro de Usuário');
    }
    
    this.logger.log('Criando novo usuário no repositório');
    const user = this.usersRepository.create(createUserDto);
    
    try {
      const savedUser = await this.usersRepository.save(user);
      this.logger.log(`Usuário salvo com sucesso: ID ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Erro ao salvar usuário: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    const { password, ...result } = user;
    return result as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}