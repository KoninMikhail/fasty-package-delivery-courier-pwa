import type { EffectCallback } from 'react';
import { useEffect } from 'react';

function useEffectOnce(effect: EffectCallback) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
}

export default useEffectOnce;
