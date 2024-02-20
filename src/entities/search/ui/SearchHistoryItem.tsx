import { GoPackage } from 'react-icons/go';
import { Button, Divider } from '@nextui-org/react';
import { IoMdClose } from 'react-icons/io';

interface SearchHistoryItemProperties {
    query: string;
    onClickItem?: (query: string) => void;
    onClickDelete?: (query: string) => void;
}

export const SearchHistoryItem: FunctionComponent<
    SearchHistoryItemProperties
> = ({ query, onClickItem, onClickDelete }) => {
    return (
        <div className="grid w-full grid-cols-[max-content_auto] gap-4">
            <div className="relative h-10 w-10 rounded-full bg-gray-100">
                <GoPackage className="translate-x-1/2 translate-y-1/2 text-xl" />
            </div>
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <p className="text-sm">{`# ${query}`}</p>
                    <Button variant="light" isIconOnly onPress={onClickDelete}>
                        <IoMdClose />
                    </Button>
                </div>
                <Divider />
            </div>
        </div>
    );
};
