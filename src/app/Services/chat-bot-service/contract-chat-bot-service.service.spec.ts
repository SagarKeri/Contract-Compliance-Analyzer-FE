import { TestBed } from '@angular/core/testing';

import { ContractChatBotServiceService } from './contract-chat-bot-service.service';

describe('ContractChatBotServiceService', () => {
  let service: ContractChatBotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractChatBotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
