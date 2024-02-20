import { createGate } from 'effector-react';
import { sample } from 'effector';
import { addSearchRequest } from '@/entities/search/model/model';

export const SearchPageGateway = createGate<{ query: string }>();

sample({
    source: SearchPageGateway.state,
    clock: SearchPageGateway.open,
    fn: (state) => state.query,
    target: addSearchRequest,
});
