import { useUnit } from 'effector-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Input, InputProps } from '@nextui-org/react';
import { $query } from '@/widgets/search/searchQueryPopup/model/stores';
import { queryChanged } from '@/widgets/search/searchQueryPopup/model/model';

interface SetQueryFieldProperties {
    size?: InputProps['size'];
}

export const SetQueryField: FunctionComponent<SetQueryFieldProperties> = ({
    size,
}) => {
    const [value, onChangeQuery] = useUnit([$query, queryChanged]);
    const [searchParameters] = useSearchParams();

    useEffect(() => {
        const urlQuery = searchParameters.get('q') || '';
        onChangeQuery(urlQuery);
    }, [onChangeQuery, searchParameters]);

    return (
        <Input
            type="search"
            autoFocus
            value={value}
            size={size}
            className="pr-0"
            classNames={{
                inputWrapper: 'after:hidden border-none pb-0',
                innerWrapper: 'pb-0',
                clearButton: 'text-xl',
            }}
            onValueChange={onChangeQuery}
            labelPlacement="outside"
            fullWidth
        />
    );
};
