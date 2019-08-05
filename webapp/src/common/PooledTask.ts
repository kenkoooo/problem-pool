export interface PooledTask {
  readonly key: string;
  readonly validUrl: string | null;
}

export const parseTask = (input: string): PooledTask => {
  const validUrl = isValidUrl(input) ? input : null;
  return { key: input, validUrl };
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
