import { modelView } from 'effector-factorio';
import { Button, ButtonProps } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { FaFireAlt } from 'react-icons/fa';
import { sharedConfigLocale } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { factory } from '../model/model';

import { translationNS } from '../config';

import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { locale } = sharedConfigLocale;

/**
 * Constants
 */
const EXPRESS_LABEL_KEY = 'label.express';

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

interface ExpressSelectorProperties
    extends Pick<ButtonProps, 'fullWidth' | 'size' | 'className'> {}

export const ExpressSelector = modelView(
    factory,
    ({ fullWidth, className, size }: ExpressSelectorProperties) => {
        const model = factory.useModel();
        const { t } = useTranslation(translationNS);
        const [onPress] = useUnit([model.expressPressed]);

        const isSelected = useUnit(model.$express);
        const label = t(EXPRESS_LABEL_KEY);

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
                {label}
            </Button>
        );
    },
);
