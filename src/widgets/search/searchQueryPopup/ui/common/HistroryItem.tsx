import { Button, Divider } from '@nextui-org/react';
import { IoMdClose } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';

// eslint-disable jsx-a11y/click-events-have-key-events

interface SearchHistoryItemProperties {
    query: string;
    onPressItem?: (query: string) => void;
    onPressDelete?: (query: string) => void;
}

export const HistoryItem: FunctionComponent<SearchHistoryItemProperties> = ({
    query,
    onPressItem,
    onPressDelete,
}) => {
    const onPressItemElement = (): void => {
        if (onPressItem) onPressItem(query);
    };

    const onPressDeleteItem = (): void => {
        if (onPressDelete) onPressDelete(query);
    };

    return (
        <div
            className="grid w-full grid-cols-[max-content_auto] gap-4"
            onClick={onPressItemElement}
        >
            <div className="relative h-10 w-10 rounded-full bg-gray-100">
                <IoSearch className="translate-x-1/2 translate-y-1/2 text-xl" />
            </div>
            <div className="w-full" style={{ cursor: 'pointer' }}>
                <div className="flex w-full items-center justify-between">
                    <p className="text-sm">{query}</p>
                    <Button
                        variant="light"
                        isIconOnly
                        onPress={onPressDeleteItem}
                    >
                        <IoMdClose />
                    </Button>
                </div>
                <Divider />
            </div>
        </div>
    );
};
