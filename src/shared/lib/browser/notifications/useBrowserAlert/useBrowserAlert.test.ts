import { act, renderHook } from '@testing-library/react';

import useBrowserAlert from './useBrowserAlert';

describe('useBrowserAlert', () => {
    beforeEach(() => {
        // Mock the alert function
        window.alert = jest.fn();
    });

    it('creates a browser alert', () => {
        const { result } = renderHook(() => useBrowserAlert());
        const message = 'This is a test alert';

        act(() => {
            result.current.createAlert(message);
        });

        expect(window.alert).toHaveBeenCalledWith(message);
    });
});
