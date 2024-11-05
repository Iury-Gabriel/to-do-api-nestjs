import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste o caminho conforme necessário

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  // Mock do PrismaService
  const mockPrismaService = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call Prisma to create a task', async () => {
    const taskData = { title: 'Test Task', description: 'Test Description' };
    await service.createTask(taskData);
    expect(prisma.task.create).toHaveBeenCalledWith({ data: taskData });
  });

  it('should call Prisma to get all tasks', async () => {
    await service.getTasks();
    expect(prisma.task.findMany).toHaveBeenCalled();
  });

  it('should call Prisma to get a task by ID', async () => {
    const id = 1;
    await service.getTaskById(id);
    expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  it('should call Prisma to update a task', async () => {
    const id = 1;
    const updateData = { title: 'Updated Title' };
    await service.updateTask(id, updateData);
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id },
      data: updateData,
    });
  });

  it('should call Prisma to delete a task', async () => {
    const id = 1;
    await service.deleteTask(id);
    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
