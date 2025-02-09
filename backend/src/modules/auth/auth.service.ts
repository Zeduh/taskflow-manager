import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    this.logger.log(`Iniciando login para usuário: ${user.email}`);
    
    const payload = { email: user.email, sub: user.id };
    
    try {
      const access_token = this.jwtService.sign(payload);
      this.logger.log(`Token JWT gerado com sucesso para: ${user.email}`);

      return {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      this.logger.error(
        `Erro ao gerar token JWT para ${user.email}: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }
}