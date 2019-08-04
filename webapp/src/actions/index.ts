import { List } from "immutable";
import { AtCoderProblem } from "../api";
import { OnlineJudge, UserIds } from "../common";

export const SUBMIT_TASK = "SUBMIT_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const RECEIVE_PROBLEMS = "RECEIVE_PROBLEMS";
export const FETCH_PROBLEMS = "FETCH_PROBLEMS";
export const SAVE_USERNAME = "SAVE_USERNAME";

export const submitTask = (url: string) => ({
  type: SUBMIT_TASK as typeof SUBMIT_TASK,
  url
});

export const removeTask = (n: number) => ({
  type: REMOVE_TASK as typeof REMOVE_TASK,
  n
});

export const receiveProblems = (problems: List<AtCoderProblem>) => ({
  type: RECEIVE_PROBLEMS as typeof RECEIVE_PROBLEMS,
  problems
});

export const requestProblems = (judge: OnlineJudge) => ({
  type: FETCH_PROBLEMS as typeof FETCH_PROBLEMS,
  judge
});

export const saveUsername = (userIds: UserIds) => ({
  type: SAVE_USERNAME as typeof SAVE_USERNAME,
  userIds
});

export type Action =
  | ReturnType<typeof submitTask>
  | ReturnType<typeof removeTask>
  | ReturnType<typeof receiveProblems>
  | ReturnType<typeof requestProblems>
  | ReturnType<typeof saveUsername>;
