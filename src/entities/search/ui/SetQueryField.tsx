import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { translationNS } from '@/widgets/search/searchQueryPopup/config';
import { Button, Input } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
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

    const isSubmitVisible = query.length > 0;

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

    useKeyPress(['Enter'], () => onPressSearch(query));

    return (
        <div className="flex flex-grow gap-2">
            <Input
                ref={reference}
                autoFocus
                className="pr-0"
                value={query}
                onValueChange={onChangeQuery}
                labelPlacement="outside"
                endContent={
                    <AnimatePresence>
                        {isSubmitVisible ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                exit={{ opacity: 0 }}
                            >
                                <Button
                                    color="secondary"
                                    onPress={onPressSearch}
                                >
                                    YFQNB
                                </Button>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                }
                fullWidth
            />
        </div>
    );
});
