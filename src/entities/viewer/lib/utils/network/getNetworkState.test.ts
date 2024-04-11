import { describe, it, expect, vi } from 'vitest';
import { getNetworkState } from './getNetworkState';

describe('getNetworkState', () => {
    it('should return online status when no connection info is available', () => {
        // Mock the `navigator` object
        vi.stubGlobal('navigator', {
            onLine: true,
        });

        const state = getNetworkState();
        expect(state).toEqual({ online: true });
    });

    it('should return detailed network info when connection info is available', () => {
        // Mock the `navigator` object with connection details
        vi.stubGlobal('navigator', {
            onLine: true,
            connection: {
                downlink: 2.5,
                type: 'wifi',
                effectiveType: '4g',
            },
        });

        const state = getNetworkState();
        expect(state).toEqual({
            online: true,
            downlink: 2.5,
            type: 'wifi',
            effectiveType: '4g',
        });
    });

    it('should handle the scenario when the device is offline', () => {
        // Mock the `navigator` object for offline status
        vi.stubGlobal('navigator', {
            onLine: false,
        });

        const state = getNetworkState();
        expect(state).toEqual({ online: false });
    });

    it('should gracefully handle missing connection object scenarios', () => {
        // Mock an online status but without a connection object
        vi.stubGlobal('navigator', {
            onLine: true,
            connection: undefined,
        });

        const state = getNetworkState();
        expect(state).toEqual({ online: true });
    });
});