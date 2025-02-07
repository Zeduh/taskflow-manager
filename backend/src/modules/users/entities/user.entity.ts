import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    BeforeInsert,
    OneToMany
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { Task } from '../../tasks/entities/task.entity';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 100 })
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }