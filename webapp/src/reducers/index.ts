import {
  Action,
  CHANGE_INPUT,
  RECEIVE_PROBLEMS,
  REMOVE_PROBLEM,
  SUBMIT_PROBLEM
} from "../actions";
import { List } from "immutable";
import { AtCoderProblem } from "../api";
import { combineReducers } from "redux";

export interface PooledTask {
  readonly url: string;
}

export interface State {
  tasks: List<PooledTask>;
  input: string;
  problems: List<AtCoderProblem>;
}

export const taskReducer = (
  state: List<PooledTask> = List(),
  action: Action
) => {
  switch (action.type) {
    case REMOVE_PROBLEM: {
      const { n } = action;
      return state.delete(n);
    }
    case SUBMIT_PROBLEM: {
      const { url } = action;
      return state.push({ url });
    }
    default: {
      return state;
    }
  }
};

export const inputReducer = (state: string = "", action: Action): string => {
  switch (action.type) {
    case CHANGE_INPUT:
      return action.input;
    case SUBMIT_PROBLEM:
      return "";
    default:
      return state;
  }
};

export const problemsReducer = (
  state: List<AtCoderProblem> = List(),
  action: Action
) => {
  switch (action.type) {
    case RECEIVE_PROBLEMS:
      return action.problems;
    default:
      return state;
  }
};

export const reducers = combineReducers<State>({
  tasks: taskReducer,
  input: inputReducer,
  problems: problemsReducer
});
