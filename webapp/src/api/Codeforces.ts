import { Problem, Submission } from "./index";
import { List } from "immutable";

export const fetchCodeforcesSubmissions = (
  userId: string,
  from: number = 1,
  count: number = 100000
) =>
  fetch(
    `https://codeforces.com/api/user.status?handle=${userId}&from=${from}&count=${count}`
  )
    .then(r => r.json())
    .then(
      (payload: {
        result: {
          id: number;
          creationTimeSecond: number;
          problem: {
            contestId: number;
            index: string;
            name: string;
          };
          author: {
            members: { handle: string }[];
          };
          programmingLanguage: string;
          verdict: string;
        }[];
      }): List<Submission> =>
        List(
          payload.result.map(s => ({
            url: `https://codeforces.com/contest/${s.problem.contestId}/submission/${s.id}`,
            userId: s.author.members[0].handle,
            result: s.verdict === "OK" ? "Accepted" : "Rejected",
            problemUrl: `https://codeforces.com/contest/${s.problem.contestId}/problem/${s.problem.index}`,
            creationTimeSecond: s.creationTimeSecond
          }))
        )
    );

export const fetchCodeforcesProblems = () =>
  fetch("https://codeforces.com/api/problemset.problems")
    .then(r => r.json())
    .then(
      (payload: {
        result: {
          problems: {
            contestId: number;
            index: string;
            name: string;
            points: number | undefined;
          }[];
        };
      }): List<Problem> =>
        List(
          payload.result.problems.map(p => ({
            url: `https://codeforces.com/contest/${p.contestId}/problem/${p.index}`,
            title: p.name,
            judge: "Codeforces"
          }))
        )
    );
