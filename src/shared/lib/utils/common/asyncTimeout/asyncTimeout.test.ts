import { asyncTimeout } from "@/shared/lib/utils";

describe('asyncTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should resolve after the specified timeout', async () => {
    const ms = 1000;
    const promise = asyncTimeout(ms);

    vi.advanceTimersByTime(ms);

    await expect(promise).resolves.toBeUndefined();
  });

  it('should be called with the correct argument', async () => {
    const ms = 500;
    const timeoutSpy = vi.spyOn(global, 'setTimeout');

    const promise = asyncTimeout(ms);
    vi.advanceTimersByTime(ms);

    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), ms);

    timeoutSpy.mockRestore();

    await promise;
  });
});