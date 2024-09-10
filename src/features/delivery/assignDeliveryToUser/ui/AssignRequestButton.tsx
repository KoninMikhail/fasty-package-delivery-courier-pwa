import { modelView } from 'effector-factorio';
import { Button, ButtonProps } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

import { Delivery } from '@/shared/api';
import { BiSolidError } from 'react-icons/bi';
import { useUnit } from 'effector-react';
import {
    BUTTON_LABEL_ALREADY_ASSIGNED,
    BUTTON_LABEL_ASSIGN_WITH_ME,
    translationNS,
} from '../config';
import { factory } from '@/features/delivery/assignDeliveryToUser/factory/factory';

interface RequestButtonProperties {
    deliverySystemId: Delivery['id'];
    buttonProps?: Omit<
        ButtonProps,
        'onPress' | 'isLoading' | 'isDisabled' | 'children' | 'isIconOnly'
    >;
}

export const AssignRequestButton = modelView(
    factory,
    ({ deliverySystemId, buttonProps, ...rest }: RequestButtonProperties) => {
        const model = factory.useModel();
        const { t } = useTranslation(translationNS);
        const [assignedItems, assignPressed, assignConfirmed] = useUnit([
            model.$assignedItems,
            model.assignPressed,
            model.assignConfirmed,
        ]);

        const isProcessing = useUnit(model.$processing);
        const isAssigned = deliverySystemId
            ? assignedItems.includes(deliverySystemId)
            : false;
        const isError = false;

        const onPress = (): void => {
            if (deliverySystemId) {
                assignPressed(deliverySystemId);
                setTimeout(() => {
                    assignConfirmed();
                }, 300);
            }
        };

        if (isAssigned) {
            return (
                <Button {...buttonProps} {...rest}>
                    {t(BUTTON_LABEL_ALREADY_ASSIGNED)}
                </Button>
            );
        }

        if (isError) {
            return (
                <Button {...buttonProps} {...rest}>
                    error
                </Button>
            );
        }

        return (
            <Button
                color="primary"
                isDisabled={isAssigned}
                isLoading={isProcessing}
                onPress={onPress}
            >
                {isError ? (
                    <BiSolidError className="text-md" />
                ) : (
                    t(BUTTON_LABEL_ASSIGN_WITH_ME)
                )}
            </Button>
        );
    },
);
