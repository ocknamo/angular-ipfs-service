import { Inject, Injectable, Optional } from '@angular/core';

import * as IpfsCore from 'ipfs-core';
import { Options } from 'ipfs-core/src/components';

declare global {
  interface Window {
    ipfs: any;
  }
}

/**
 * Wrapper service of ipfs-core.
 *
 * @dynamic
 */
@Injectable({
  providedIn: 'root',
})
export class NgIpfsService {
  private _ipfsCore: typeof IpfsCore;
  private node: null | IpfsCore.IPFS = null;

  constructor(
    @Inject('IpfsCore') @Optional() ipfsCore: typeof IpfsCore | undefined
  ) {
    this._ipfsCore = ipfsCore ? ipfsCore : IpfsCore;
  }

  async start(options: Options = {}): Promise<void> {
    if (this.node) {
      console.log('Ng-ipfs: IPFS already started');
    } else if (window.ipfs && window.ipfs.enable) {
      console.log('Ng-ipfs: Found window.ipfs');
      this.node = await window.ipfs.enable({ commands: ['id'] });
    } else {
      // eslint-disable-next-line no-console
      console.time('Ng-ipfs: IPFS is started');
      try {
        this.node = await this._ipfsCore.create(options);
        // eslint-disable-next-line no-console
        console.timeEnd('Ng-ipfs: IPFS started');
      } catch (error) {
        console.error('Ng-ipfs: IPFS init error:', error);
        this.node = null;
      }
    }
  }

  get(): IpfsCore.IPFS {
    if (this.node === null) {
      throw new Error('Ng-ipfs: Ipfs node is not started yet.');
    }

    return this.node;
  }
}
