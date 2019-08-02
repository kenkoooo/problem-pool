import { ActionType, BaseAction } from "../common";

export const submitProblem = (problem: string): BaseAction => ({
  type: ActionType.SUBMIT_PROBLEM,
  payload: problem
});

export const removeProblem = (n: number): BaseAction => ({
  type: ActionType.REMOVE_PROBLEM,
  payload: n
});

export const changeInput = (input: string): BaseAction => ({
  type: ActionType.CHANGE_INPUT,
  payload: input
});
