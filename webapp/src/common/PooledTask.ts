export interface PooledTask {
  readonly key: string;
  readonly validUrl: string | undefined;
  readonly createdAt: number;
  readonly nextReviewTime: number;
  readonly lastJudgeAccepted: number | undefined;
  readonly lastSolvedByUser: number | undefined;
}

export const generateTask = (input: string): PooledTask => {
  const validUrl = isValidUrl(input) ? input : undefined;
  const createdAt = Date.now() / 1000;
  return {
    key: input,
    validUrl,
    createdAt,
    nextReviewTime: createdAt,
    lastJudgeAccepted: undefined,
    lastSolvedByUser: undefined
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
