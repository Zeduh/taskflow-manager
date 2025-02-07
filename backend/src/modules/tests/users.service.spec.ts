// src/modules/users/tests/users.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersRepository } from '../users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUsersRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    findByEmail: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      mockUsersRepository.findByEmail.mockResolvedValue(null);
      mockUsersRepository.create.mockReturnValue(createUserDto);
      mockUsersRepository.save.mockResolvedValue({
        id: '1',
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.create(createUserDto);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(createUserDto.email);
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw ConflictException if email already exists', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123',
      };

      mockUsersRepository.findByEmail.mockResolvedValue({
        id: '1',
        ...createUserDto,
      });

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const userId = '1';
      const mockUser = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
      };

      mockUsersRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.findOne(userId);

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = 'nonexistent';

      mockUsersRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [
        {
          id: '1',
          name: 'User 1',
          email: 'user1@example.com',
        },
        {
          id: '2',
          name: 'User 2',
          email: 'user2@example.com',
        },
      ];

      mockUsersRepository.find.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const userId = '1';
      const updateUserDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const existingUser = {
        id: userId,
        name: 'Old Name',
        email: 'old@example.com',
      };

      mockUsersRepository.findOneBy.mockResolvedValue(existingUser);
      mockUsersRepository.findByEmail.mockResolvedValue(null);
      mockUsersRepository.save.mockResolvedValue({
        ...existingUser,
        ...updateUserDto,
      });

      const result = await service.update(userId, updateUserDto);

      expect(result.name).toBe(updateUserDto.name);
      expect(result.email).toBe(updateUserDto.email);
    });
  });

  describe('remove', () => {
    it('should remove user successfully', async () => {
      const userId = '1';
      const user = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
      };

      mockUsersRepository.findOneBy.mockResolvedValue(user);
      mockUsersRepository.remove.mockResolvedValue(user);

      await service.remove(userId);

      expect(repository.remove).toHaveBeenCalledWith(user);
    });
  });

  describe('findByEmail', () => {
    it('should return user when email exists', async () => {
      const email = 'test@example.com';
      const mockUser = {
        id: '1',
        name: 'Test User',
        email,
      };

      mockUsersRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.findByEmail(email);

      expect(result).toEqual(mockUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({ email });
    });

    it('should return null when email does not exist', async () => {
      const email = 'nonexistent@example.com';

      mockUsersRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findByEmail(email);

      expect(result).toBeNull();
    });
  });
});