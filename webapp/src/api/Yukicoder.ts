import { List } from "immutable";
import { Problem, Submission } from "./index";

export const fetchYukicoderProblems = () =>
  fetch("https://yukicoder.me/api/v1/problems")
    .then(r => r.json())
    .then(
      (
        problems: { No: number; ProblemId: number; Title: string }[]
      ): List<Problem> =>
        List(
          problems.map(problem => ({
            url: `https://yukicoder.me/problems/no/${problem.No}`,
            title: `No.${problem.No} ${problem.Title}`,
            judge: "yukicoder"
          }))
        )
    );

export const fetchYukicoderSolvedProblems = (userId: string) =>
  fetch(`https://yukicoder.me/api/v1/solved/name/${userId}`)
    .then(r => r.json())
    .then(
      (
        problems: { No: number; ProblemId: number; Title: string }[]
      ): List<Submission> =>
        List(
          problems.map(problem => ({
            url: `https://yukicoder.me/problems/no/${problem.No}`,
            userId: userId,
            result: "Accepted",
            problemUrl: `https://yukicoder.me/problems/no/${problem.No}`,
            creationTimeSecond: undefined
          }))
        )
    );
