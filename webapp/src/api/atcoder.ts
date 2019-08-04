import { Problem, Submission } from "./index";
import { List } from "immutable";

export const fetchAtCoderSubmissions = (userId: string) =>
  fetch(`https://kenkoooo.com/atcoder/atcoder-api/results?user=${userId}`)
    .then(r => r.json())
    .then(
      (submissions: AtCoderSubmission[]): List<Submission> =>
        List(
          submissions.map(s => ({
            url: `https://atcoder.jp/contests/${s.contest_id}/tasks/${s.problem_id}`,
            userId: s.user_id,
            result: s.result === "AC" ? "Accepted" : "Rejected",
            problemUrl: `https://atcoder.jp/contests/${s.contest_id}/tasks/${s.problem_id}`
          }))
        )
    );
export const fetchAtCoderProblems = () =>
  fetch("https://kenkoooo.com/atcoder/resources/problems.json")
    .then(r => r.json())
    .then(
      (problems: AtCoderProblem[]): List<Problem> =>
        List(
          problems.map(problem => ({
            url: `https://atcoder.jp/contests/${problem.contest_id}/tasks/${problem.id}`,
            title: problem.title
          }))
        )
    );

interface AtCoderSubmission {
  id: number;
  epoch_second: number;
  problem_id: string;
  contest_id: string;
  user_id: string;
  result: string;
}

interface AtCoderProblem {
  title: string;
  contest_id: string;
  id: string;
}
