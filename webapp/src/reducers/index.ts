import {
  Action,
  CHANGE_INPUT,
  RECEIVE_PROBLEMS,
  REMOVE_PROBLEM,
  SUBMIT_PROBLEM
} from "../actions";
import { combineReducers } from "redux";
import { List } from "immutable";
import { AtCoderProblem } from "../api";

export interface Task {
  url: string;
}

export interface State {
  tasks: List<Task>;
  input: string;
  problems: List<AtCoderProblem>;
}

export const taskReducer = (state: List<Task> = List(), action: Action) => {
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
