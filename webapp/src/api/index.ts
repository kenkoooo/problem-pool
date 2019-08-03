import { List } from "immutable";

export interface AtCoderProblem {
  id: string;
  contest_id: string;
  title: string;
}

export const fetchAtCoderProblems = () =>
  fetch("https://kenkoooo.com/atcoder/resources/problems.json")
    .then(res => res.json())
    .then(payload => List(payload as AtCoderProblem[]));
