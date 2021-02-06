import { NgIpfsService } from './ng-ipfs.service';

const mockIpfs = {
  create: () => Promise.resolve('This is mock node'),
};

describe('NgIpfsService', () => {
  let service: NgIpfsService;

  beforeEach(() => {
    service = new NgIpfsService(mockIpfs as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Ipfs node', async () => {
    await service.start();
    expect(service.get()).toBe('This is mock node' as any);
  });

  it('should not get Ipfs node without start', async () => {
    expect(service.get()).toBeNull();
  });
});
