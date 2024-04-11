import React, { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/style-prop-object */

export const DeleteDocumentIcon = (
    properties: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
): ReactNode => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        imageRendering="optimizeQuality"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        viewBox="0 0 200 200"
        {...properties}
    >
        <path
            d="M0 100c0 55.9 44.1 100 100 100s100-44.1 100-100C200 43.8 156.5 0 100 0 44.1 0 0 44.1 0 100"
            style="fill:#e42313"
        />
        <path
            d="M72.2 150.9v-16.5h20.5V64.6H73.5V48.3H111v86.1h23.4l-6 16.5z"
            style="fill:#fefefe"
        />
    </svg>
);
