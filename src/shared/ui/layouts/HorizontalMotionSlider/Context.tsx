import { createContext, PropsWithChildren, useReducer, useMemo } from 'react';

// Define state and action types with generics
interface State<T> {
    items: T[];
    activeItem: number;
}

type Action<T> =
    | { type: 'ADD_ITEM'; item: T }
    | { type: 'SET_ACTIVE_ITEM'; activeItem: number };

const ADD_ITEM = 'ADD_ITEM';
const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM';

// Initial State with generics
const initialState = {
    items: [],
    activeItem: 0,
};

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
        case ADD_ITEM: {
            return {
                ...state,
                items: [...state.items, action.item],
            };
        }
        case SET_ACTIVE_ITEM: {
            return {
                ...state,
                activeItem: action.activeItem,
            };
        }
        default: {
            return state;
        }
    }
}

// Context shape with generics
interface ContextType<T> {
    state: State<T>;
    dispatch: React.Dispatch<Action<T>>;
}

export const Context = createContext<ContextType<any> | undefined>(undefined);

export const ContextProvider = <T,>({
    children,
}: PropsWithChildren): JSX.Element => {
    const [state, dispatch] = useReducer<
        (state: State<T>, action: Action<T>) => State<T>
    >(reducer, initialState as State<T>);
    // Use useMemo to optimize performance
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return <Context.Provider value={value}>{children}</Context.Provider>;
};
