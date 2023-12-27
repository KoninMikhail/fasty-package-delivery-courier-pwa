import { useCallback } from 'react';

function useBrowserAlert() {
    const createAlert = useCallback((message: string) => {
        alert(message);
    }, []);

    return { createAlert };
}

export default useBrowserAlert;
