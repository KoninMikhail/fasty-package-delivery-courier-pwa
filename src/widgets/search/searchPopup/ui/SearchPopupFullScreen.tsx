import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from '@nextui-org/react';
import { MdArrowBack } from 'react-icons/md';
import { useList, useUnit } from 'effector-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedUiComponents } from '@/shared/ui';
import { $historyRequestsStore } from '@/entities/search/model/model';
import { searchUi } from '@/entities/search';
import { $isOpened, clickCloseArrow } from '../model';

const { RouteName } = sharedConfigRoutes;
const { IdentifierField } = sharedUiComponents;
const { SEARCH_PAGE } = RouteName;
const { SearchHistoryItem } = searchUi;

export const SearchPopupFullScreen: FunctionComponent = () => {
    const navigate = useNavigate();
    const [isOpen, onClickClose] = useUnit([$isOpened, clickCloseArrow]);
    const [query, setQuery] = useState<string>('');

    const onChangeValue = (value: string) => {
        setQuery(value);
    };

    const onPressSearch = (): void => {
        const queryParameters = new URLSearchParams({
            q: query,
        }).toString();
        navigate(`${SEARCH_PAGE}?${queryParameters}`);
    };

    const historyItems = useList($historyRequestsStore, (query) => {
        return <SearchHistoryItem query={query} />;
    });

    return (
        <Modal
            size="full"
            isOpen={isOpen}
            hideCloseButton
            onClose={onClickClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 px-2">
                            <div className="flex">
                                <Button
                                    variant="light"
                                    onPress={onClose}
                                    className=""
                                    isIconOnly
                                >
                                    <MdArrowBack className="text-xl" />
                                </Button>
                                <div className="flex flex-grow gap-2">
                                    <IdentifierField
                                        autoFocus
                                        value={query}
                                        variant="flat"
                                        placeholder="00000000"
                                        onValueChange={onChangeValue}
                                        labelPlacement="outside"
                                        fullWidth
                                    />
                                    <Button
                                        color="secondary"
                                        onPress={onPressSearch}
                                    >
                                        Найти
                                    </Button>
                                </div>
                            </div>
                        </ModalHeader>
                        <Divider />
                        <ModalBody className="px-4">
                            <span className="py-2 text-sm font-bold">
                                Недавние запросы
                            </span>
                            {historyItems}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
