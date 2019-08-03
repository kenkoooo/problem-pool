export const fetchSubmissions = (userId: string, from: number, count: number) =>
  fetch(
    `https://codeforces.com/api/user.status?handle=${userId}&from=${from}&count=${count}`
  )
    .then(r => r.json())
    .then((payload: { result: Submission[] }) =>
      payload.result.map(
        (submission: Submission): CodeforcesSubmission => ({
          id: submission.id,
          contestId: submission.problem.contestId,
          problemIndex: submission.problem.index,
          userId: submission.author.members[0].handle
        })
      )
    );

export interface CodeforcesSubmission {
  id: number;
  contestId: number;
  problemIndex: string;
  userId: string;
}

interface Submission {
  id: number;
  problem: {
    contestId: number;
    index: string;
    name: string;
  };
  author: {
    members: { handle: string }[];
  };
}
