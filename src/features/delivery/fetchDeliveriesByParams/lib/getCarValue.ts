export const getCarValue = (type: Set<string>): boolean | undefined => {
  if (type.has('car')) {
    return true;
  }
  if (type.has('foot')) {
    return false;
  }
  return undefined;
};
