import { Injectable } from '@nestjs/common';
import LRU from 'lru-cache';
import { randomBytes } from 'crypto';

@Injectable()
export class NonceService {
  private readonly cache = new LRU<string, string>({ max: 1000, ttl: 5 * 60 * 1000 });

  generate(address: string) {
    const nonce = randomBytes(16).toString('hex');
    this.cache.set(nonce, address.toLowerCase());
    return nonce;
  }

  consume(nonce: string, address: string) {
    const cached = this.cache.get(nonce);
    if (!cached) {
      return false;
    }
    this.cache.delete(nonce);
    return cached === address.toLowerCase();
  }
}
