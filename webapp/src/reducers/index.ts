import { Action, REMOVE_TASK, SAVE_USERNAME, SUBMIT_TASK } from "../actions";
import { List } from "immutable";
import { combineReducers } from "redux";
import {
  PooledTask,
  ProblemPool,
  State,
  SubmissionPool,
  UserIds
} from "../common";
import * as LocalStorage from "../common/LocalStorage";

export const taskReducer = (
  state: List<PooledTask> = List(),
  action: Action
) => {
  switch (action.type) {
    case REMOVE_TASK: {
      const { n } = action;
      return state.delete(n);
    }
    case SUBMIT_TASK: {
      const { url } = action;
      return state.push({ url });
    }
    default: {
      return state;
    }
  }
};

export const userIdsReducer = (
  state: UserIds = {
    atcoder: "",
    codeforces: "",
    yukicoder: "",
    aoj: ""
  },
  action: Action
) => {
  switch (action.type) {
    case SAVE_USERNAME: {
      LocalStorage.saveUserIds(action.userIds);
      return action.userIds;
    }
    default: {
      return state;
    }
  }
};

export const submissionPoolReducer = (
  state: SubmissionPool = { codeforces: List() },
  action: Action
) => {
  return state;
};
export const problemPoolReducer = (
  state: ProblemPool = { atcoder: List() },
  action: Action
) => {
  return state;
};

export const reducers = combineReducers<State>({
  tasks: taskReducer,
  userIds: userIdsReducer,
  submissionPool: submissionPoolReducer,
  problemPool: problemPoolReducer
});
