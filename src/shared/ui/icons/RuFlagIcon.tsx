import { ReactElement, SVGProps } from 'react';
import { JSX } from 'react/jsx-runtime';

export const RuFlagIcon = (
    properties: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
): ReactElement => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 480"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        {...properties}
    >
        <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="#fff" d="M0 0h640v480H0z" />
            <path fill="#0039a6" d="M0 160h640v320H0z" />
            <path fill="#d52b1e" d="M0 320h640v160H0z" />
        </g>
    </svg>
);
