import { createGate } from 'effector-react';
import { sample } from 'effector';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';

export const SearchPageGateway = createGate<{ query: string }>();

sample({
    source: SearchPageGateway.state,
    clock: SearchPageGateway.open,
    fn: (state) => state.query,
    target: widgetSearchQueryPopupModel.addSearchRequest,
});
