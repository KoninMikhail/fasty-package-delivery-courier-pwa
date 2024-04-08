import { InputProps } from '@nextui-org/input/dist/input';
import { PerformSearchButton, SetQueryField } from './common/components';

interface SearchQueryInputWithPopoverProperties {
    size?: InputProps['size'];
}

export const SearchQueryInputWithPopover: FunctionComponent<
    SearchQueryInputWithPopoverProperties
> = ({ size }) => {
    return (
        <>
            <SetQueryField />
            <PerformSearchButton size={size} />
        </>
    );
};
