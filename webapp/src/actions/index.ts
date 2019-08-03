import { List } from "immutable";
import { AtCoderProblem } from "../api";

export const SUBMIT_PROBLEM = "SUBMIT_PROBLEM";
export const REMOVE_PROBLEM = "REMOVE_PROBLEM";
export const CHANGE_INPUT = "CHANGE_INPUT";
export const RECEIVE_PROBLEMS = "RECEIVE_PROBLEMS";
export const FETCH_PROBLEMS = "FETCH_PROBLEMS";

export const submitProblem = (url: string) => ({
  type: SUBMIT_PROBLEM as typeof SUBMIT_PROBLEM,
  url
});

export const removeProblem = (n: number) => ({
  type: REMOVE_PROBLEM as typeof REMOVE_PROBLEM,
  n
});

export const changeInput = (input: string) => ({
  type: CHANGE_INPUT as typeof CHANGE_INPUT,
  input
});

export const receiveProblems = (problems: List<AtCoderProblem>) => ({
  type: RECEIVE_PROBLEMS as typeof RECEIVE_PROBLEMS,
  problems
});

export const requestProblems = () => ({
  type: FETCH_PROBLEMS as typeof FETCH_PROBLEMS
});

export type Action =
  | ReturnType<typeof submitProblem>
  | ReturnType<typeof removeProblem>
  | ReturnType<typeof changeInput>
  | ReturnType<typeof receiveProblems>
  | ReturnType<typeof requestProblems>;
