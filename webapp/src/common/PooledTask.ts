export interface PooledTask {
  readonly key: string;
  readonly validUrl: string | null;
  readonly createdAt: number;
  readonly nextReviewTime: number;
  readonly lastJudgeAccepted: number | null;
  readonly lastSolvedByUser: number | null;
}

export const createTask = (input: string): PooledTask => {
  const validUrl = isValidUrl(input) ? input : null;
  const createdAt = Date.now() / 1000;
  return {
    key: input,
    validUrl,
    createdAt,
    nextReviewTime: createdAt,
    lastJudgeAccepted: null,
    lastSolvedByUser: null
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
