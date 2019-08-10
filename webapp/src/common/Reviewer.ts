export type ReviewResult = "Solved" | "Good" | "Hard" | "Failed";

const daysToSeconds = (days: number) => days * 24 * 3600;

export const suggestNextReviewTime = (
  lastSolvedTimeSecond: number | undefined,
  reviewResult: ReviewResult
) => {
  const currentSecond = Date.now() / 1000;
  const duration = lastSolvedTimeSecond
    ? currentSecond - lastSolvedTimeSecond
    : 0;
  switch (reviewResult) {
    case "Solved":
      return Math.max(duration * 2, daysToSeconds(4)) + currentSecond;
    case "Good":
      return Math.max(duration, daysToSeconds(4)) + currentSecond;
    case "Hard":
      return Math.max(duration / 2, daysToSeconds(4)) + currentSecond;
    case "Failed":
      return daysToSeconds(4) + currentSecond;
  }
};
