import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translationNS } from '@/widgets/search/searchQueryPopup/config';
import { Button, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useKeyPress } from '@/shared/lib/browser';

interface SetQueryFieldProperties {
    path: string;
    onPressSearchButton: () => void;
}

export const SetQueryField = forwardRef<
    HTMLInputElement,
    SetQueryFieldProperties
>(({ onPressSearchButton, path }, reference) => {
    const { t } = useTranslation(translationNS);
    const navigate = useNavigate();
    const [query, setQuery] = useState<string>('');

    const onChangeQuery = (value: string): void => {
        setQuery(value);
    };
    const onPressSearch = (): void => {
        const queryParameters = new URLSearchParams({
            q: query,
        }).toString();
        onPressSearchButton();
        navigate(`${path}?${queryParameters}`);
    };

    useKeyPress(['Enter'], () => onPressSearch());

    return (
        <div className="flex flex-grow gap-2">
            <Input
                ref={reference}
                autoFocus
                className="pr-0"
                value={query}
                onValueChange={onChangeQuery}
                labelPlacement="outside"
                fullWidth
            />
            <Button color="primary" onPress={onPressSearch}>
                Поиск
            </Button>
        </div>
    );
});
