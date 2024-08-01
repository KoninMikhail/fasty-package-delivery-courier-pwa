import { getClientName } from './getClientName';
import { Client } from "@/shared/api";

describe('getClientName', () => {
    it('returns client name when client object is provided', () => {
        const client: { name: string; id: string; type: string } = { name: 'Test Client', id: '1', type: "organization" };
        const result = getClientName(client);
        expect(result).toEqual('Test Client');
    });

    it('returns empty string when client object is null', () => {
        const result = getClientName(null);
        expect(result).toEqual('');
    });

    it('returns empty string when client object is undefined', () => {
        const result = getClientName(undefined);
        expect(result).toEqual('');
    });

    it('returns empty string when client name is null', () => {
        const client: Client = { name: null, id: '1' };
        const result = getClientName(client);
        expect(result).toEqual('');
    });

    it('returns empty string when client name is undefined', () => {
        const client: Client = { name: undefined, id: '1' };
        const result = getClientName(client);
        expect(result).toEqual('');
    });
});