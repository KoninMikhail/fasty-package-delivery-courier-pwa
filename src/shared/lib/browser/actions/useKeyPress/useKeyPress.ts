import { useCallback } from 'react';
import {useEventListener} from "usehooks-ts";

type ModifierKey = 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey';
type EventModifierKeys = Partial<Record<ModifierKey, boolean>>;

/*
 * @name useKeyPress
 *
 * Use it for bind callbacks on key press
 *
 * It takes an array of keys.ts and a callback function, and calls the callback function whenever any of
 * the keys.ts are pressed
 *
 * @param keys.ts - An array of keys.ts that we want to listen for.
 * @param callback - (event: KeyboardEvent) => void
 * @param modifiers - An object of modifiers that we also want to listen for.
 */
const useKeyPress = (
    keys: string[],
    callback: (event: KeyboardEvent) => void,
    modifiers: EventModifierKeys = {}
): void => {
    const handleEvent = useCallback(
        (event: KeyboardEvent) => {
            if (
                keys.includes(event.key) &&
                (Object.keys(modifiers) as ModifierKey[]).every(
                    (modKey: ModifierKey) =>
                        event[modKey] === !!modifiers[modKey]
                )
            ) {
                callback(event);
            }
        },
        [keys, callback, modifiers]
    );

    useEventListener('keydown', handleEvent);
};

export default useKeyPress;

