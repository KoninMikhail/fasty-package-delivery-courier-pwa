import type React from 'react';
import { sharedLibApp } from '@/shared/lib';
import { useGate } from 'effector-react';

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const { AppGate } = sharedLibApp;

export const withAppGate = (component: () => React.ReactNode) => () => {
    useGate(AppGate);
    return component();
};
