import React from 'react';
import { sharedLibInit } from '@/shared/lib';
import { useGate } from 'effector-react';

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

const { AppInitGate } = sharedLibInit;

export const withAppInitGate = (component: () => React.ReactNode) => () => {
    useGate(AppInitGate);
    return component();
};
