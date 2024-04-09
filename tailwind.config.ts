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
        backgroundImage: {
            'map-light': "url('/assets/images/map-bg-light.jpg')",
            'map-dark': "url('/assets/images/map-bg-dark.jpg')",
            'delivery-not-exist': "url('/icons/delivery-not-exist.png')",
            ...defaultTheme.backgroundImage,
        },
        screens: {
            '3xl': '1900px',
            '4xl': '2400px',
            '5xl': '3600px',
            ...defaultTheme.screens,
        },
    },
    darkMode: 'class',
    experimental: { optimizeUniversalDefaults: true },
    plugins: [nextui()],
} satisfies Config;
