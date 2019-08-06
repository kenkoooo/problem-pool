import { List } from "immutable";
import { Problem, Submission } from "./index";

export const fetchAOJProblems = (page: number = 0, size: number = 10000) =>
  fetch(`https://judgeapi.u-aizu.ac.jp/problems?page=${page}&size=${size}`)
    .then(r => r.json())
    .then(
      (
        problems: {
          id: string;
          name: string;
        }[]
      ): List<Problem> =>
        List(
          problems.map(problem => ({
            url: `https://onlinejudge.u-aizu.ac.jp/problems/${problem.id}`,
            title: `${problem.id}: ${problem.name}`,
            judge: "AOJ"
          }))
        )
    );

export const fetchAOJSubmissions = (
  userId: string,
  page: number = 0,
  size: number = 100000
) =>
  fetch(
    `https://judgeapi.u-aizu.ac.jp/solutions/users/${userId}?page=${page}&size=${size}`
  )
    .then(r => r.json())
    .then(
      (
        submissions: {
          judgeId: number;
          userId: string;
          problemId: string;
          language: string;
        }[]
      ): List<Submission> =>
        List(
          submissions.map(submission => ({
            url: `https://onlinejudge.u-aizu.ac.jp/solutions/problem/${submission.problemId}/review/${submission.judgeId}/${submission.userId}/${submission.language}`,
            problemUrl: `https://onlinejudge.u-aizu.ac.jp/problems/${submission.problemId}`,
            userId: submission.userId,
            result: "Accepted"
          }))
        )
    );
