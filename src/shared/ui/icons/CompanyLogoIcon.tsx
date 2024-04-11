import { JSX } from 'react/jsx-runtime';
import { ReactElement, SVGProps } from 'react';

export const CompanyLogoIcon = (
    properties: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
): ReactElement => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 15.3 23.85"
        width="1em"
        {...properties}
    >
        <path
            fill="currentColor"
            d="M15.3 18.55 15.3 22.08 12.24 23.85 12.24 20.31 15.3 18.55z"
        />
        <g>
            <path
                fill="currentColor"
                d="M15.3 11.48 15.3 15.02 9.18 18.55 9.18 23.85 6.12 22.08 6.12 16.78 15.3 11.48z"
            />
            <path
                fill="currentColor"
                d="M15.3 7.95 6.12 13.25 6.12 9.72 15.3 4.41 15.3 7.95z"
            />
            <path
                fill="currentColor"
                d="M3.06 7.95 3.06 20.32 0 18.55 0 6.19 10.71 0 13.77 1.77 3.06 7.95z"
            />
        </g>
    </svg>
);
