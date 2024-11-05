import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  // Mock do TasksService
  const mockTasksService = {
    createTask: jest.fn(),
    getTasks: jest.fn(),
    getTaskById: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createTask with the correct data', () => {
    const taskData = { title: 'Test Task', description: 'Test Description' };
    controller.createTask(taskData);
    expect(service.createTask).toHaveBeenCalledWith(taskData);
  });

  it('should call getTasks', () => {
    controller.getTasks();
    expect(service.getTasks).toHaveBeenCalled();
  });

  it('should call getTaskById with the correct id', () => {
    const id = '1';
    controller.getTaskById(id);
    expect(service.getTaskById).toHaveBeenCalledWith(+id);
  });

  it('should call updateTask with the correct id and data', () => {
    const id = '1';
    const updateData = { title: 'Updated Title' };
    controller.updateTask(id, updateData);
    expect(service.updateTask).toHaveBeenCalledWith(+id, updateData);
  });

  it('should call markTaskAsCompleted with the correct id', () => {
    const id = '1';
    controller.markTaskAsCompleted(id);
    expect(service.updateTask).toHaveBeenCalledWith(+id, { completed: true });
  });

  it('should call deleteTask with the correct id', () => {
    const id = '1';
    controller.deleteTask(id);
    expect(service.deleteTask).toHaveBeenCalledWith(+id);
  });
});
