import { renderHook } from '@testing-library/react';
import { useKeyPress } from './useKeyPress';
import { fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('useKeyPress', () => {
  it('should call callback when key is pressed', () => {
    const callback = vi.fn();

    renderHook(() => useKeyPress(['a'], callback));

    fireEvent.keyDown(document, { key: 'a' });

    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback for different key', () => {
    const callback = vi.fn();

    renderHook(() => useKeyPress(['a'], callback));

    fireEvent.keyDown(document, { key: 'b' });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call callback when key and modifier are pressed', () => {
    const callback = vi.fn();

    renderHook(() => useKeyPress(['a'], callback, { ctrlKey: true }));

    fireEvent.keyDown(document, { key: 'a', ctrlKey: true });

    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback when key is pressed without modifier', () => {
    const callback = vi.fn();

    renderHook(() => useKeyPress(['a'], callback, { ctrlKey: true }));

    fireEvent.keyDown(document, { key: 'a', ctrlKey: false });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call callback when key and wrong modifier are pressed', () => {
    const callback = vi.fn();

    renderHook(() => useKeyPress(['a'], callback, { shiftKey: true }));

    fireEvent.keyDown(document, { key: 'a' });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call callback when multiple keys and modifiers are pressed', () => {
    const callback = vi.fn();

    renderHook(() => useKeyPress(['a', 'b'], callback, { ctrlKey: true, shiftKey: true }));

    fireEvent.keyDown(document, { key: 'b', ctrlKey: true, shiftKey: true });

    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback when any of multiple keys are pressed without correct modifiers', () => {
    const callback = vi.fn();

    renderHook(() => useKeyPress(['a', 'b'], callback, { ctrlKey: true, shiftKey: true }));

    fireEvent.keyDown(document, { key: 'b', ctrlKey: true, shiftKey: false });

    expect(callback).not.toHaveBeenCalled();
  });
});