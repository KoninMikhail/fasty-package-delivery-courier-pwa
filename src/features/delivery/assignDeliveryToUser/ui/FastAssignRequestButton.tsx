import {
    Button,
    ButtonProps,
    Popover,
    PopoverContent,
    PopoverProps,
    PopoverTrigger,
} from '@nextui-org/react';
import { modelView } from 'effector-factorio';
import { Delivery } from '@/shared/api';
import { MdLibraryAdd } from 'react-icons/md';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { BiSolidError } from 'react-icons/bi';
import { useUnit } from 'effector-react';
import type { User } from '@/shared/api';
import { useTranslation } from 'react-i18next';
import { factory } from '../model/model';
import { translationNS } from '../config';

interface RequestButtonProperties {
    delivery: Delivery;
    user: Nullable<User>;
    popoverProps?: Pick<PopoverProps, 'placement' | 'backdrop'>;
    buttonProps?: Omit<
        ButtonProps,
        'onPress' | 'isLoading' | 'isDisabled' | 'children' | 'isIconOnly'
    >;
}

export const FastAssignRequestButton = modelView(
    factory,
    ({
        delivery,
        user,
        popoverProps,
        buttonProps,
        ...rest
    }: RequestButtonProperties) => {
        const model = factory.useModel();
        const { t } = useTranslation(translationNS);
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [assignedItems, assignPressed, assignConfirmed, assignRejected] =
            useUnit([
                model.$assignedItems,
                model.assignPressed,
                model.assignConfirmed,
                model.assignRejected,
                model.assignCompleted,
            ]);

        const isProcessing = useUnit(model.$processing);
        const isAssigned = delivery
            ? assignedItems.includes(delivery.id)
            : false;
        const isError = false;

        const deliveryId = delivery.id.toString().padStart(6, '0');

        const onOpenChange = (open: boolean): void => {
            if (open && delivery && user) {
                assignPressed({ delivery, user });
                setIsOpen(true);
            } else {
                assignRejected();
                setIsOpen(false);
            }
        };

        const onPressAssign = () => {
            assignConfirmed();
        };

        const onPressReject = () => {
            assignRejected();
            setIsOpen(false);
        };

        if (isAssigned) {
            return (
                <Button isIconOnly {...buttonProps} {...rest}>
                    <FaCheck className="text-md" />
                </Button>
            );
        }

        if (isError) {
            return (
                <Button isIconOnly {...buttonProps} {...rest}>
                    <BiSolidError className="text-md" />
                </Button>
            );
        }

        return (
            <Popover
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement={popoverProps?.placement}
                backdrop={popoverProps?.backdrop}
                showArrow
            >
                <PopoverTrigger>
                    <Button isIconOnly>
                        {isError ? (
                            <BiSolidError className="text-md" />
                        ) : (
                            <MdLibraryAdd className="text-xl" />
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-2 px-1 py-2">
                        <div className="max-w-48 text-center text-2xl font-bold text-content3">
                            {`#${deliveryId}`}
                        </div>
                        <div className="max-w-48 text-center font-bold">
                            Уверены, что хотите начать эту доставку?
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button onPress={onPressReject}>Cancel</Button>
                            <Button
                                isLoading={isProcessing}
                                onPress={onPressAssign}
                                color="primary"
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    },
);
