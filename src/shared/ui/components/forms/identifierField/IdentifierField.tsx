import { forwardRef } from 'react';
import { Input } from '@nextui-org/react';
import { InputProps } from '@nextui-org/input/dist/input';

type IdentifierFieldProperties = Omit<InputProps, 'type' | 'startContent'> & {
    padLength?: number;
};

export const IdentifierField = forwardRef<
    HTMLInputElement,
    IdentifierFieldProperties
>(
    (
        { onChange, padLength, onValueChange, value, placeholder, ...rest },
        reference,
    ) => {
        const extractNumbers = (inputValue: InputProps['value']): string => {
            if (!inputValue) return '';
            return inputValue.replaceAll(/\D/g, '');
        };

        const padWithZeros = (inputValue: string): string => {
            if (!inputValue) return '';
            return inputValue.padStart(padLength || 8, '0');
        };

        const outputPlaceholder = padWithZeros(extractNumbers(placeholder));
        const outputValue = padWithZeros(extractNumbers(value));

        const onValueChangeHandler = (inputValue: string): void => {
            const numbers = extractNumbers(inputValue);
            onValueChange?.(padWithZeros(numbers));
        };

        const onChangeHandler = (
            event: React.ChangeEvent<HTMLInputElement>,
        ): React.ChangeEvent<HTMLInputElement> => {
            return {
                ...event,
                target: {
                    ...event.target,
                    value: padWithZeros(extractNumbers(event.target.value)),
                },
            };
        };

        return (
            <Input
                ref={reference}
                type="text"
                value={outputValue}
                placeholder={outputPlaceholder}
                onValueChange={onValueChangeHandler}
                onChange={onChangeHandler}
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-small text-default-400">#</span>
                    </div>
                }
                {...rest}
            />
        );
    },
);
