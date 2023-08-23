import { Test, TestingModule } from '@nestjs/testing';
import { AppSocketGateway } from './socket.gateway';
import { AppSocketService } from './socket.service';

describe('SocketGateway', () => {
  let gateway: AppSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppSocketGateway, AppSocketService],
    }).compile();

    gateway = module.get<AppSocketGateway>(AppSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
