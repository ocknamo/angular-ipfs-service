import { Inject, Injectable, Optional } from '@angular/core';

import * as Ipfs from 'ipfs-core';
import { PromiseType } from './utils/types';

declare global {
  interface Window {
    ipfs: any;
  }
}

/**
 * Wrapper service of ipfs-core.
 */
@Injectable({
  providedIn: 'root',
})
export class NgIpfsService {
  private ipfs: typeof Ipfs;
  private node: null | PromiseType<ReturnType<typeof Ipfs.create>> = null;

  constructor(@Inject(undefined) @Optional() node: typeof Ipfs | undefined) {
    this.ipfs = node ? node : Ipfs;
  }

  async start(): Promise<void> {
    if (this.node) {
      console.log('IPFS already started');
    } else if (window.ipfs && window.ipfs.enable) {
      console.log('Found window.ipfs');
      this.node = await window.ipfs.enable({ commands: ['id'] });
    } else {
      // eslint-disable-next-line no-console
      console.time('IPFS Started');
      try {
        this.node = await this.ipfs.create();
        // eslint-disable-next-line no-console
        console.timeEnd('IPFS Started');
      } catch (error) {
        console.error('IPFS init error:', error);
        this.node = null;
      }
    }
  }

  get(): null | PromiseType<ReturnType<typeof Ipfs.create>> {
    return this.node;
  }
}
