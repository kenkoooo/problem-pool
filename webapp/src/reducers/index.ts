import {
  Action,
  RECEIVE_PROBLEMS,
  RECEIVE_SUBMISSIONS,
  REMOVE_TASK,
  SAVE_USERNAME,
  SUBMIT_TASK
} from "../actions";
import { List, Map } from "immutable";
import { combineReducers } from "redux";
import { State, UserIds } from "../common";
import * as LocalStorage from "../common/LocalStorage";
import { PooledTask } from "../common/PooledTask";
import { Problem, Submission } from "../api";

const taskReducer = (state: List<PooledTask> = List(), action: Action) => {
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

const userIdsReducer = (
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

const submissionReducer = (
  state: Map<[string, string], Submission> = Map(),
  action: Action
) => {
  switch (action.type) {
    case RECEIVE_SUBMISSIONS: {
      const { submissions } = action;
      return state.merge(
        submissions.map(submission => {
          const { url, userId } = submission;
          const key: [string, string] = [userId, url];
          return [key, submission];
        })
      );
    }
    default:
      return state;
  }
};
const problemReducer = (
  state: Map<string, Problem> = Map(),
  action: Action
) => {
  switch (action.type) {
    case RECEIVE_PROBLEMS: {
      const { problems } = action;
      return state.merge(problems.map(problem => [problem.url, problem]));
    }
    default: {
      return state;
    }
  }
};

export const reducers = combineReducers<State>({
  tasks: taskReducer,
  userIds: userIdsReducer,
  submissions: submissionReducer,
  problems: problemReducer
});
