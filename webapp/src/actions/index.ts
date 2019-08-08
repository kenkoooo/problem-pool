import { List } from "immutable";
import { Problem, Submission } from "../api";
import { OnlineJudge, UserIds } from "../common";

export const SUBMIT_TASK = "SUBMIT_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const RECEIVE_PROBLEMS = "RECEIVE_PROBLEMS";
export const SAVE_USERNAME = "SAVE_USERNAME";
export const REQUEST_SUBMISSIONS = "REQUEST_SUBMISSIONS";
export const RECEIVE_SUBMISSIONS = "RECEIVE_SUBMISSIONS";
export const CLEAR_SUBMISSIONS = "CLEAR_SUBMISSIONS";
export const SOLVE_TASK = "SOLVE_TASK";
export const REQUEST_TOKEN = "REQUEST_TOKEN";
export const RECEIVE_TOKEN = "RECEIVE_TOKEN";
export const FAILED_TOKEN = "FAILED_TOKEN";

export const submitTask = (url: string) => ({
  type: SUBMIT_TASK as typeof SUBMIT_TASK,
  url
});

export const removeTask = (key: string) => ({
  type: REMOVE_TASK as typeof REMOVE_TASK,
  key
});

export const receiveProblems = (problems: List<Problem>) => ({
  type: RECEIVE_PROBLEMS as typeof RECEIVE_PROBLEMS,
  problems
});

export const saveUsername = (userIds: UserIds) => ({
  type: SAVE_USERNAME as typeof SAVE_USERNAME,
  userIds
});

export const requestSubmissions = (userId: string, judge: OnlineJudge) => ({
  type: REQUEST_SUBMISSIONS as typeof REQUEST_SUBMISSIONS,
  userId,
  judge
});

export const receiveSubmissions = (submissions: List<Submission>) => ({
  type: RECEIVE_SUBMISSIONS as typeof RECEIVE_SUBMISSIONS,
  submissions
});

export const clearSubmissions = () => ({
  type: CLEAR_SUBMISSIONS as typeof CLEAR_SUBMISSIONS
});

export const solveTask = (
  key: string,
  solvedSecond: number,
  reviewSecond: number
) => ({
  type: SOLVE_TASK as typeof SOLVE_TASK,
  key,
  solvedSecond,
  reviewSecond
});

export const requestToken = (
  userId: string,
  password: string,
  register: boolean
) => ({
  type: REQUEST_TOKEN as typeof REQUEST_TOKEN,
  userId,
  password,
  register
});

export const receiveToken = (token: string) => ({
  type: RECEIVE_TOKEN as typeof RECEIVE_TOKEN,
  token
});

export const failedToken = () => ({
  type: FAILED_TOKEN as typeof FAILED_TOKEN
});

export type Action =
  | ReturnType<typeof submitTask>
  | ReturnType<typeof removeTask>
  | ReturnType<typeof receiveProblems>
  | ReturnType<typeof saveUsername>
  | ReturnType<typeof receiveSubmissions>
  | ReturnType<typeof requestSubmissions>
  | ReturnType<typeof clearSubmissions>
  | ReturnType<typeof solveTask>
  | ReturnType<typeof requestToken>
  | ReturnType<typeof receiveToken>
  | ReturnType<typeof failedToken>;
