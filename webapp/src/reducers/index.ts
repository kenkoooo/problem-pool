import {
  Action,
  CLEAR_SUBMISSIONS,
  RECEIVE_PROBLEMS,
  RECEIVE_SUBMISSIONS,
  REMOVE_TASK,
  SAVE_USERNAME,
  SUBMIT_TASK
} from "../actions";
import { List, Map } from "immutable";
import { State, UserIds } from "../common";
import { PooledTask } from "../common/PooledTask";
import { Problem, Submission } from "../api";
import initialize from "../initialize";

const taskReducer = (
  state: Map<string, PooledTask> = Map(),
  action: Action
) => {
  switch (action.type) {
    case REMOVE_TASK: {
      const { key } = action;
      return state.remove(key);
    }
    case SUBMIT_TASK: {
      const { url } = action;
      return state.set(url, { url });
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
      return action.userIds;
    }
    default: {
      return state;
    }
  }
};

const submissionReducer = (
  state: Map<string, List<Submission>> = Map(),
  action: Action
) => {
  switch (action.type) {
    case RECEIVE_SUBMISSIONS: {
      const { submissions } = action;
      return state.mergeWith(
        (a, b) => a.concat(b),
        submissions.reduce(
          (map, submission) =>
            map.update(submission.problemUrl, List(), list =>
              list.push(submission)
            ),
          Map<string, List<Submission>>()
        )
      );
    }
    case CLEAR_SUBMISSIONS: {
      return state.clear();
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

const rootReducer = (state: State = initialize(), action: Action): State => ({
  tasks: taskReducer(state.tasks, action),
  userIds: userIdsReducer(state.userIds, action),
  submissions: submissionReducer(state.submissions, action),
  problems: problemReducer(state.problems, action)
});

export default rootReducer;
