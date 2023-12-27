import { act, renderHook } from '@testing-library/react';

import useBrowserPrompt from './useBrowserPrompt';

describe('useBrowserPrompt', () => {
    beforeEach(() => {
        jest.spyOn(window, 'prompt').mockImplementation(() => 'test-result');
    });

    afterEach(() => {
        (window.prompt as jest.Mock).mockRestore();
    });

    it('should return initial value as null', () => {
        const { result } = renderHook(() => useBrowserPrompt());
        expect(result.current[0]).toBeNull();
    });

    it('should update the value when showPrompt is called', () => {
        const { result } = renderHook(() => useBrowserPrompt());
        const message = 'Some message';

        act(() => {
            result.current[1](message);
        });

        expect(window.prompt).toHaveBeenCalledWith(message);
        expect(result.current[0]).toBe('test-result');
    });

    it('should set value to null if prompt is canceled', () => {
        (window.prompt as jest.Mock).mockImplementationOnce(() => null);

        const { result } = renderHook(() => useBrowserPrompt());
        const message = 'Some message';

        act(() => {
            result.current[1](message);
        });

        expect(window.prompt).toHaveBeenCalledWith(message);
        expect(result.current[0]).toBeNull();
    });
});
