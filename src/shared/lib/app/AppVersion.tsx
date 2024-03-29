const { PACKAGE_VERSION } = import.meta.env;

export const AppVersion: FunctionComponent = () => {
  return PACKAGE_VERSION;
};
