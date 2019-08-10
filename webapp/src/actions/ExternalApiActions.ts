import { OnlineJudge } from "../common";
import { List } from "immutable";
import { Problem, Submission } from "../api";

export const RECEIVE_PROBLEMS = "RECEIVE_PROBLEMS";
export const REQUEST_SUBMISSIONS = "REQUEST_SUBMISSIONS";
export const RECEIVE_SUBMISSIONS = "RECEIVE_SUBMISSIONS";

export const receiveProblems = (problems: List<Problem>) => ({
  type: RECEIVE_PROBLEMS as typeof RECEIVE_PROBLEMS,
  problems
});

export const requestSubmissions = (userId: string, judge: OnlineJudge) => ({
  type: REQUEST_SUBMISSIONS as typeof REQUEST_SUBMISSIONS,
  judge,
  userId
});

export const receiveSubmissions = (submissions: List<Submission>) => ({
  type: RECEIVE_SUBMISSIONS as typeof RECEIVE_SUBMISSIONS,
  submissions
});

export type ExternalApiActionType =
  | ReturnType<typeof receiveProblems>
  | ReturnType<typeof requestSubmissions>
  | ReturnType<typeof receiveSubmissions>;
