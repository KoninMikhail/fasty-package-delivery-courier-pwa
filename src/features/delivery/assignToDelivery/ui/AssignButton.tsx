import {
    Button,
    ButtonProps,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/react';
import { modelView } from 'effector-factorio';
import { Delivery } from '@/shared/api';
import { MdLibraryAdd } from 'react-icons/md';
import { PropsWithChildren, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { BiSolidError } from 'react-icons/bi';
import { factory } from '../model/model';

const ConfirmPopover: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <Popover
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(!open)}
            showArrow
            placement="top-end"
            backdrop="opaque"
        >
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-2 px-1 py-2">
                    <div className="max-w-48 text-center text-2xl font-bold text-content3">
                        #00
                    </div>
                    <div className="max-w-48 text-center font-bold">
                        Уверены, что хотите начать эту доставку?
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button onPress={() => setIsOpen(false)}>Cancel</Button>
                        <Button color="primary" onPress={onPressHandler}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

interface IAssignButtonProperties
    extends Omit<
        ButtonProps,
        'onPress' | 'isLoading' | 'isDisabled' | 'children' | 'isIconOnly'
    > {
    deliveryId: Delivery['id'];
}

export const AssignButton: FunctionComponent = modelView(
    factory,
    ({ id, ...properties }: IAssignButtonProperties) => {
        const model = factory.useModel();
        const [isOpen, setIsOpen] = useState(false);

        const isProcessing = false;
        const isAssigned = false;
        const isError = false;

        const onPressHandler = () => {
            setIsOpen(true);
        };

        return (
            <Popover
                isOpen={isOpen}
                onOpenChange={(open) => setIsOpen(!open)}
                showArrow
                placement="top-end"
                backdrop="opaque"
            >
                <PopoverTrigger>
                    <Button
                        isLoading={isProcessing}
                        onPress={onPressHandler}
                        isIconOnly
                        {...properties}
                    >
                        {isAssigned ? (
                            <FaCheck className="text-xl" />
                        ) : (isError ? (
                            <BiSolidError />
                        ) : (
                            <MdLibraryAdd className="text-xl" />
                        ))}
                    </Button>
                </PopoverTrigger>
            </Popover>
        );
    },
);
