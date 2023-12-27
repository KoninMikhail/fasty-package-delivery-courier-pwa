import { useIsomorphicLayoutEffect } from '@/shared/lib/browser/effects';

function useDocumentTitle(title: string): void {
    useIsomorphicLayoutEffect(() => {
        window.document.title = title;
    }, [title]);
}

export default useDocumentTitle;
