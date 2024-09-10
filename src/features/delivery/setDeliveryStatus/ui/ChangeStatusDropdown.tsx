import { modelView } from 'effector-factorio';
import { Button, Spacer, Tab, Tabs, Textarea } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { motion } from 'framer-motion';
import { Key, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { DeliveryStates } from '@/shared/api';
import { factory } from '../model/model';
import { translationNS } from '../config';

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

const Message: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();
    const isRejected = useUnit(model.$isRejectStatus);

    const onChangeValue = useUnit(model.messageChanged);

    return (
        <Textarea
            fullWidth
            variant="bordered"
            isRequired={isRejected}
            label={
                isRejected ? t(REJECT_REASON_LABEL) : t(SUCCESS_REASON_LABEL)
            }
            onValueChange={onChangeValue}
        />
    );
};

const SubmitButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();

    const pending = useUnit(model.$pending);
    const isValid = useUnit(model.$formValid);

    const onPress = useUnit(model.submitPressed);

    return (
        <Button
            color="primary"
            isDisabled={!isValid}
            onPress={onPress}
            fullWidth
            isLoading={pending}
        >
            {t(SUBMIT_BUTTON_LABEL)}
        </Button>
    );
};
const Selector: FunctionComponent = () => {
    const model = factory.useModel();
    const { t } = useTranslation(translationNS);
    const { allowedStatuses, $status, statusChanged } = model;

    const status = useUnit($status);
    const onChangeValue = useUnit(statusChanged);

    const hydratedStatus = (key: string): string => {
        return t(key);
    };

    const onSelectionChange = (value: Key): void => {
        onChangeValue(value as unknown as DeliveryStates);
    };

    return (
        <div className="flex w-full flex-col">
            <Tabs
                fullWidth
                size="md"
                aria-label="Set state form"
                selectedKey={status}
                onSelectionChange={onSelectionChange}
            >
                {allowedStatuses.map((statusDeclaration) => {
                    return (
                        <Tab
                            key={statusDeclaration.id}
                            title={hydratedStatus(statusDeclaration.label)}
                        >
                            {statusDeclaration.message ? (
                                <Message
                                    requiereMessage={
                                        statusDeclaration.requireMessage
                                    }
                                />
                            ) : null}
                            <Spacer y={3} />
                            <SubmitButton />
                        </Tab>
                    );
                })}
            </Tabs>
        </div>
    );
};

const CancelButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const model = factory.useModel();

    const onPress = useUnit(model.reset);

    return (
        <Button variant="light" onPress={onPress} fullWidth>
            {t(CANCEL_BUTTON_LABEL)}
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
