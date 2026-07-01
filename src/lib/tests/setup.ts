import { beforeEach, vi } from 'vitest';

vi.useFakeTimers();
vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2025-01-01T00:00:00Z'));
});
