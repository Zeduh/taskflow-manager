import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
  status: string;
}