export type ReviewResult = "Solved" | "Good" | "Hard" | "Failed";

const daysToSeconds = (days: number) => days * 24 * 3600;

export const getReviewDuration = (
  lastSolvedTimeSecond: number | null,
  reviewResult: ReviewResult
) => {
  const currentTime = Date.now();
  const span = lastSolvedTimeSecond
    ? currentTime / 1000 - lastSolvedTimeSecond
    : 0;
  const duration = Math.max(span, daysToSeconds(1));
  switch (reviewResult) {
    case "Solved":
      return Math.max(duration * 2, daysToSeconds(4));
    case "Good":
      return Math.max(duration, daysToSeconds(4));
    case "Hard":
      return Math.max(duration / 2, daysToSeconds(4));
    case "Failed":
      return daysToSeconds(4);
  }
};
