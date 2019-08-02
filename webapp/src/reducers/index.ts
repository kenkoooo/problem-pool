import { ActionType, BaseAction } from "../common";
import { combineReducers } from "redux";
import { List } from "immutable";

export interface Task {
  url: string;
}

export interface State {
  tasks: List<Task>;
  input: string;
}

export const taskReducer = (state: List<Task> = List(), action: BaseAction) => {
  switch (action.type) {
    case ActionType.REMOVE_PROBLEM: {
      const n = action.payload;
      return state.delete(n);
    }
    case ActionType.SUBMIT_PROBLEM: {
      const url = action.payload;
      return state.push({ url });
    }
    default: {
      return state;
    }
  }
};

export const inputReducer = (
  state: string = "",
  action: BaseAction
): string => {
  switch (action.type) {
    case ActionType.CHANGE_INPUT:
      return action.payload;
    case ActionType.SUBMIT_PROBLEM:
      return "";
    default:
      return state;
  }
};

export const reducers = combineReducers<State>({
  tasks: taskReducer,
  input: inputReducer
});
