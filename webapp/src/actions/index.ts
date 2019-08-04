import { List } from "immutable";
import { Problem, Submission } from "../api";
import { OnlineJudge, UserIds } from "../common";

export const SUBMIT_TASK = "SUBMIT_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const RECEIVE_PROBLEMS = "RECEIVE_PROBLEMS";
export const SAVE_USERNAME = "SAVE_USERNAME";
export const REQUEST_SUBMISSIONS = "REQUEST_SUBMISSIONS";
export const RECEIVE_SUBMISSIONS = "RECEIVE_SUBMISSIONS";

export const submitTask = (url: string) => ({
  type: SUBMIT_TASK as typeof SUBMIT_TASK,
  url
});

export const removeTask = (n: number) => ({
  type: REMOVE_TASK as typeof REMOVE_TASK,
  n
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

export type Action =
  | ReturnType<typeof submitTask>
  | ReturnType<typeof removeTask>
  | ReturnType<typeof receiveProblems>
  | ReturnType<typeof saveUsername>
  | ReturnType<typeof receiveSubmissions>
  | ReturnType<typeof requestSubmissions>;
