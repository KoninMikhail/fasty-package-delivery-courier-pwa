import { ReactElement, ValidationMap, WeakValidationMap } from "react";

declare module '*.svg' {
    import type React from 'react';

    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const source: string;
    export default source;
}

declare module '*.module.css';
declare module '*.module.scss';

declare module '*.png';

interface FunctionComponent<P = Record<string, unknown>> {
    (properties: P, context?: unknown): ReactElement<unknown, unknown> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<unknown> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}


