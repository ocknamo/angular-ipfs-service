import { NgIpfsService } from './angular-ipfs.service';

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
    await expectAsync(service.get()).toBeResolvedTo('This is mock node' as any);
  });

  it('should not get Ipfs node without start', async () => {
    expect(service.get.bind(service)).toThrowError(
      'Ng-ipfs: Ipfs node is not started yet. Please call "start()" before.'
    );
  });

  it('should get Ipfs node when existing ipfs in window', async () => {
    const mockWindow = {
      ipfs: {
        enable: () => Promise.resolve('This is mock node from window object'),
      },
    };
    service = new NgIpfsService(mockIpfs as any, mockWindow as Window);

    await service.start();
    await expectAsync(service.get()).toBeResolvedTo(
      'This is mock node from window object' as any
    );
  });
});
