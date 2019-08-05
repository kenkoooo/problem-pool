export interface PooledTask {
  readonly key: string;
  readonly validUrl: string | null;
  readonly createdAt: number;
  readonly reviewAt: number;
  readonly lastAccepted: number | null;
}

export const createTask = (input: string): PooledTask => {
  const validUrl = isValidUrl(input) ? input : null;
  const createdAt = Date.now() / 1000;
  return {
    key: input,
    validUrl,
    createdAt,
    reviewAt: createdAt,
    lastAccepted: null
  };
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
