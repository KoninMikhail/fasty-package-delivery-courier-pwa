const getEnvironmentVariable = (key: string) => {
	if (import.meta.env[key] === undefined) {
		throw new Error(`Env variable ${key} is required`)
	}
	return import.meta.env[key] || ''
}

// region hosts
// export const DELIVERIES_API_HOST = getEnvVar('VITE_DELIVERIES_API_HOST');

// endregion

export const NODE_ENV = getEnvironmentVariable('MODE')
export const isDevEnv = NODE_ENV === 'development'
export const isProdEnv = NODE_ENV === 'production'
