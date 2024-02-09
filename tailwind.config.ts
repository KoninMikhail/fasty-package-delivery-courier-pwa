import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import { nextui } from '@nextui-org/react';

export default {
    ...defaultTheme,
    content: [
        'index.html',
        'src/**/*.tsx',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            sans: ['Inter', ...defaultTheme.fontFamily.sans],
        },
    },
    darkMode: 'class',
    experimental: { optimizeUniversalDefaults: true },
    plugins: [nextui()],
} satisfies Config;
