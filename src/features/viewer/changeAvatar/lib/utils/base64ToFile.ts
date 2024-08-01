
export const base64ToFile = (
  base64: string,
  filename: string,
): Promise<File> => {
  return fetch(base64)
    .then((response) => response.blob())
    .then((blob) => new File([blob], filename, { type: 'image/png' }));
};