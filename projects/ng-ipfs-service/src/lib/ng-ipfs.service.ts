import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, skip, take } from 'rxjs/operators';

import * as IpfsCore from 'ipfs-core';
import { Options } from 'ipfs-core/src/components';

declare global {
  interface Window {
    ipfs: any;
  }
}

type ServiceStatus = 'INIT' | 'STARTING' | 'STARTED';

/**
 * Wrapper service of ipfs-core.
 *
 * @dynamic
 */
@Injectable()
export class NgIpfsService {
  private _ipfsCore: typeof IpfsCore;
  private _window: Window;

  private status$ = new BehaviorSubject<ServiceStatus>('INIT');
  private node$ = new BehaviorSubject<null | IpfsCore.IPFS>(null);

  constructor(
    @Inject('IpfsCore') @Optional() ipfsCore: typeof IpfsCore | undefined,
    @Inject('Window') @Optional() _window?: Window | undefined
  ) {
    this._ipfsCore = ipfsCore ? ipfsCore : IpfsCore;
    this._window = _window || window;
  }

  async start(options: Options = {}): Promise<void> {
    const status = this.status$.getValue();

    if (status === 'INIT' && this._window.ipfs && this._window.ipfs.enable) {
      console.log('Ng-ipfs: Found window.ipfs');
      const node = await this._window.ipfs.enable({ commands: ['id'] });
      this.node$.next(node);
      this.status$.next('STARTED');

      return;
    }

    switch (status) {
      case 'STARTED':
      case 'STARTING':
        console.log('Ng-ipfs: IPFS is already started');
        break;
      case 'INIT':
        // eslint-disable-next-line no-console
        console.time('Ng-ipfs: IPFS is started');
        this.status$.next('STARTING');
        try {
          const node = await this._ipfsCore.create(options);
          this.node$.next(node);
          this.status$.next('STARTED');
          // eslint-disable-next-line no-console
          console.timeEnd('Ng-ipfs: IPFS is started');
        } catch (error) {
          console.error('Ng-ipfs: IPFS init error:', error);
          this.node$.next(null);
          this.status$.next('INIT');
        }
        break;
    }
  }

  get(): Promise<IpfsCore.IPFS> {
    const status = this.status$.getValue();

    if (status === 'INIT') {
      throw new Error(
        'Ng-ipfs: Ipfs node is not started yet. Please call "start()" before.'
      );
    }

    // When status is 'STARTING' or 'STARTED'.
    return this.node$
      .pipe(
        filter((v) => !!v),
        take(1)
      )
      .toPromise();
  }
}
