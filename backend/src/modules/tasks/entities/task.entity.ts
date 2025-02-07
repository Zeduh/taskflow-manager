import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn 
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  
  @Entity('tasks')
  export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @Column('text')
    description: string;
  
    @Column({
      type: 'enum',
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
      default: 'PENDING'
    })
    status: string;
  
    @Column('uuid')
    userId: string;
  
    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }