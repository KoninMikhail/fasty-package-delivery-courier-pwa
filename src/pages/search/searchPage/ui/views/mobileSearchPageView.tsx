import { useSearchParams } from 'react-router-dom';
import { useGate } from 'effector-react';
import { SearchPageGateway } from '@/pages/search/searchPage/model';

export const MobileSearchPageView: FunctionComponent = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();
    useGate(SearchPageGateway, {
        query: searchParameters.get('q'),
    });
    return <div>{searchParameters.get('q')}</div>;
};
