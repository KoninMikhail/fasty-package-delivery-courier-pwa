import { modelView } from 'effector-factorio';
import { Button, ButtonProps } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

import { Delivery } from '@/shared/api';
import { BiSolidError } from 'react-icons/bi';
import { useUnit } from 'effector-react';
import type { User } from '@/shared/api';
import { translationNS } from '../config';
import { factory } from '../model/model';

const TRANSLATION = {
    LABEL_TO_ASSIGN: 'button.label',
    LABEL_ASSIGNED: 'button.label.assigned',
};

interface RequestButtonProperties {
    delivery: Delivery;
    user: Nullable<User>;
    buttonProps?: Omit<
        ButtonProps,
        'onPress' | 'isLoading' | 'isDisabled' | 'children' | 'isIconOnly'
    >;
}

export const AssignRequestButton = modelView(
    factory,
    ({ delivery, user, buttonProps, ...rest }: RequestButtonProperties) => {
        const model = factory.useModel();
        const { t } = useTranslation(translationNS);
        const [assignedItems, assignPressed, assignConfirmed] = useUnit([
            model.$assignedItems,
            model.assignPressed,
            model.assignConfirmed,
        ]);

        const isProcessing = useUnit(model.$processing);
        const isAssigned = delivery
            ? assignedItems.includes(delivery.id)
            : false;
        const isError = false;

        const onPress = (): void => {
            if (delivery && user) {
                assignPressed({ delivery, user });
                assignConfirmed();
            }
        };

        if (isAssigned) {
            return (
                <Button {...buttonProps} {...rest}>
                    {t(TRANSLATION.LABEL_ASSIGNED)}
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
                    t(TRANSLATION.LABEL_TO_ASSIGN)
                )}
            </Button>
        );
    },
);
