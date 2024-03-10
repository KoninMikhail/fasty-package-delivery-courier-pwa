import { modelView } from 'effector-factorio';
import {
    Button,
    Select,
    SelectItem,
    Spacer,
    Textarea,
} from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
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

const SELECTOR_LABEL = 'label.selector';
const SELECTOR_PLACEHOLDER = 'label.selector.placeholder';
const SUBMIT_BUTTON_LABEL = 'label.button.set';
const CANCEL_BUTTON_LABEL = 'label.button.cancel';
const SUCCESS_REASON_LABEL = 'label.reason.success';
const REJECT_REASON_LABEL = 'label.reason.reject';

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * Layout
 */

const FormContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="w-full">{children}</div>;
};

const FormSection: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const model = factory.useModel();
    const status = useUnit(model.$status);
    const isStatusNotEmpty = status instanceof Set && status.size > 0;

    return (
        <motion.div
            initial={{ height: 0, opacity: 0, y: 20 }}
            animate={{
                height: isStatusNotEmpty ? 'auto' : 0,
                opacity: isStatusNotEmpty ? 1 : 0,
                y: 0,
                transitionEnd: { display: isStatusNotEmpty ? 'block' : 'none' },
            }}
            exit={{ opacity: 0, y: 20, animationDelay: 0.4 }}
            transition={{
                type: 'spring',
                height: {
                    type: 'tween',
                    duration: 0.3,
                    delay: isStatusNotEmpty ? 0 : 0.6,
                },
                opacity: { duration: 0.3, delay: 0.3 },
            }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

const Selector: FunctionComponent = () => {
    const model = factory.useModel();
    const { t } = useTranslation(translationNS);
    const { allowedStatuses, $status, statusChanged } = model;
    const status = useUnit($status);
    const onChangeValue = useUnit(statusChanged);

    const selectorLabel = t(SELECTOR_LABEL);
    const selectorPlaceholder = t(SELECTOR_PLACEHOLDER);

    const hydratedStatus = (key: string): string => {
        return t(key);
    };

    return (
        <Select
            fullWidth
            label={selectorLabel}
            placeholder={selectorPlaceholder}
            selectedKeys={status}
            onSelectionChange={onChangeValue}
            selectionMode="single"
        >
            {allowedStatuses.map((statusDeclaration) => (
                <SelectItem
                    key={statusDeclaration.id}
                    value={statusDeclaration.id}
                >
                    {hydratedStatus(statusDeclaration.label)}
                </SelectItem>
            ))}
        </Select>
    );
};
const Message: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();
    const isRejected = useUnit(model.$isRejectStatus);
    const label = isRejected ? t(REJECT_REASON_LABEL) : t(SUCCESS_REASON_LABEL);

    const onChangeValue = useUnit(model.messageChanged);

    return (
        <Textarea
            fullWidth
            variant="bordered"
            isRequired={isRejected}
            label={label}
            onValueChange={onChangeValue}
        />
    );
};

const SubmitButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();
    const pending = useUnit(model.$pending);
    const label = t(SUBMIT_BUTTON_LABEL);

    const isValidate = useUnit(model.$formValid);

    const onPress = useUnit(model.submitPressed);

    return (
        <Button
            color="primary"
            isDisabled={!isValidate}
            onPress={onPress}
            fullWidth
            isLoading={pending}
        >
            {label}
        </Button>
    );
};

const CancelButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();
    const onPress = useUnit(model.reset);

    const label = t(CANCEL_BUTTON_LABEL);

    return (
        <Button variant="light" onPress={onPress} fullWidth>
            {label}
        </Button>
    );
};

export const ChangeStatusDropdown = modelView(factory, () => {
    return (
        <div>
            <Selector />
            <FormContainer>
                <FormSection>
                    <Spacer y={3} />
                    <Message />
                    <Spacer y={3} />
                </FormSection>
                <FormSection>
                    <SubmitButton />
                    <Spacer y={3} />
                </FormSection>
                <FormSection>
                    <CancelButton />
                </FormSection>
            </FormContainer>
        </div>
    );
});
