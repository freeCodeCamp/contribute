import { describe, it, expect } from 'vitest';
import { getRedirectedPath } from '../src/modules/redirect';

describe('getRedirectedPath', () => {
  it('should redirect empty hash to /intro/', () => {
    const result = getRedirectedPath('');
    expect(result).toBe('/intro/');
  });

  it('should redirect "#/" to /intro/', () => {
    const result = getRedirectedPath('#/');
    expect(result).toBe('/intro/');
  });

  it('should redirect "#" to /intro/', () => {
    const result = getRedirectedPath('#');
    expect(result).toBe('/intro/');
  });

  it('should redirect "#anything" to /intro/', () => {
    const result = getRedirectedPath('#anything');
    expect(result).toBe('/intro/');
  });

  it('should redirect "#/path" to /path/', () => {
    const result = getRedirectedPath('#/path');
    expect(result).toBe('/path/');
  });

  it('should redirect "#/path?id=hash" to /path/#hash', () => {
    const result = getRedirectedPath('#/path?id=hash');
    expect(result).toBe('/path/#hash');
  });
});
