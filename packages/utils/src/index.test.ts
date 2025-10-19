import { describe, expect, it } from 'vitest';
import { formatServ } from './index';

describe('formatServ', () => {
  it('formats numbers with two decimal places', () => {
    expect(formatServ(1234.5)).toBe('1,234.50');
  });
});
