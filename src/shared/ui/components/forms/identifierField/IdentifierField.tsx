import { ChangeEvent, forwardRef } from 'react';
import { Input } from '@nextui-org/react';
import { sharedLibHelpers } from '@/shared/lib';
import { InputProps } from '@nextui-org/input/dist/input';

const { padCharacters, clearPaddedCharacters } = sharedLibHelpers;

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
            return padCharacters(inputValue, padLength || 8, '0');
        };

        const sanitizeValue = (inputValue: string): string => {
            if (!inputValue) return '';
            return clearPaddedCharacters(extractNumbers(inputValue));
        };

        const onValueChangeHandler = (inputValue: string): void => {
            onValueChange?.(sanitizeValue(inputValue));
        };
        const onChangeHandler = (
            event: ChangeEvent<HTMLInputElement>,
        ): ChangeEvent<HTMLInputElement> => {
            return {
                ...event,
                target: {
                    ...event.target,
                    value: sanitizeValue(event.target.value),
                },
            };
        };

        return (
            <Input
                ref={reference}
                type="number"
                min={0}
                step={1}
                value={value}
                placeholder={placeholder}
                onValueChange={onValueChangeHandler}
                onChange={onChangeHandler}
                {...rest}
            />
        );
    },
);
