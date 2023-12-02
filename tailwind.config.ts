import type {Config} from 'tailwindcss'
import defaultConfig from 'tailwindcss/defaultConfig'
import formsPlugin from '@tailwindcss/forms'

export default {
	content: ['index.html', 'src/**/*.tsx'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultConfig.theme.fontFamily.sans]
		}
	},
	experimental: { optimizeUniversalDefaults: true },
	plugins: [formsPlugin]
} satisfies Config
