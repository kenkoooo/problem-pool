export enum ActionType {
  SUBMIT_PROBLEM = "SUBMIT_PROBLEM",
  REMOVE_PROBLEM = "REMOVE_PROBLEM",
  CHANGE_INPUT = "CHANGE_INPUT"
}

export interface BaseAction {
  type: ActionType;
  payload: any;
}
