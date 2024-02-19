import { useSearchParams } from 'react-router-dom';

export const MobileSearchPageView: FunctionComponent = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();
    console.log(searchParameters.get('q'));
    return <div>MobileSearchPageView</div>;
};
