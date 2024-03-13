import { modelView } from 'effector-factorio';
import { Button, ButtonProps } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { FaFireAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { factory } from '../model/model';

import { translationNS } from '../config';

/**
 * Constants
 */
const EXPRESS_LABEL_KEY = 'label.express';

interface ExpressSelectorProperties
    extends Pick<ButtonProps, 'fullWidth' | 'size' | 'className'> {}

export const ExpressSelector = modelView(
    factory,
    ({ fullWidth, className, size }: ExpressSelectorProperties) => {
        const model = factory.useModel();
        const { t } = useTranslation(translationNS);

        const isSelected = useUnit(model.$express);
        const onPress = useUnit(model.expressPressed);

        return (
            <Button
                color="danger"
                className={className}
                size={size}
                variant={isSelected ? 'solid' : 'bordered'}
                onPress={onPress}
                fullWidth={fullWidth}
            >
                <FaFireAlt />
                {t(EXPRESS_LABEL_KEY)}
            </Button>
        );
    },
);
