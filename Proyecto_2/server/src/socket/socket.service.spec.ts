import { Test, TestingModule } from '@nestjs/testing';
import { AppSocketService } from './socket.service';

describe('SocketService', () => {
  let service: AppSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppSocketService],
    }).compile();

    service = module.get<AppSocketService>(AppSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
