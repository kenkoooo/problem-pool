import { ActionType, BaseAction } from "../common";
import { combineReducers } from "redux";

export interface Task {
  url: string;
}

export interface State {
  tasks: Task[];
  input: string;
}

export const taskReducer = (state: Task[] = [], action: BaseAction) => {
  switch (action.type) {
    case ActionType.REMOVE_PROBLEM: {
      const n = action.payload;
      const newState = state.slice();
      newState.splice(n, 1);
      return newState;
    }
    case ActionType.SUBMIT_PROBLEM: {
      const url = action.payload;
      const newState = state.slice();
      newState.push({ url });
      return newState;
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
