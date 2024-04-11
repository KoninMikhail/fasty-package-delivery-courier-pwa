import React from 'react';
import { useGate } from 'effector-react';
import { sharedLibApp } from '@/shared/lib/';

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

const { AppGate } = sharedLibApp;

export const withAppGate = (component: () => React.ReactNode) => () => {
    useGate(AppGate);
    return component();
};
