import { InputProps } from '@nextui-org/react';
import { PerformSearchButton, SetQueryField } from './common/components';

interface SearchQueryInputWithPopoverProperties {
    size?: InputProps['size'];
}

export const SearchQueryInput: FunctionComponent<
    SearchQueryInputWithPopoverProperties
> = ({ size }) => {
    return (
        <>
            <SetQueryField />
            <PerformSearchButton size={size} />
        </>
    );
};
