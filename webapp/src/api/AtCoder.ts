import { Problem, Submission } from "./index";
import { List } from "immutable";

export const fetchAtCoderSubmissions = (userId: string) =>
  fetch(`https://kenkoooo.com/atcoder/atcoder-api/results?user=${userId}`)
    .then(r => r.json())
    .then(
      (submissions: AtCoderSubmission[]): List<Submission> =>
        List(
          submissions.map(submission => ({
            url: `https://atcoder.jp/contests/${submission.contest_id}/submissions/${submission.id}`,
            userId: submission.user_id,
            result: submission.result === "AC" ? "Accepted" : "Rejected",
            problemUrl: `https://atcoder.jp/contests/${submission.contest_id}/tasks/${submission.problem_id}`
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
            title: problem.title,
            judge: "AtCoder"
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
