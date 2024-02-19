import { createGate } from 'effector-react';
import { debug } from 'patronum';

export const SearchPageGateway = createGate();

debug(SearchPageGateway.state);
