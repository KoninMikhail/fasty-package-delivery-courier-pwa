import { useCallback, useState } from 'react';

const useBrowserPrompt = (): [string | null, (message: string) => void] => {
    const [value, setValue] = useState<string | null>(null);

    const showPrompt = useCallback((message: string): void => {
        const result = prompt(message);
        setValue(result);
    }, []);

    return [value, showPrompt];
};

export default useBrowserPrompt;
