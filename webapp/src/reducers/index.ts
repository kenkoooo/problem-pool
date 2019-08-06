import {
  Action,
  CLEAR_SUBMISSIONS,
  RECEIVE_PROBLEMS,
  RECEIVE_SUBMISSIONS,
  REMOVE_TASK,
  SAVE_USERNAME,
  SOLVE_TASK,
  SUBMIT_TASK
} from "../actions";
import { List, Map } from "immutable";
import { State, UserIds } from "../common";
import { createTask, PooledTask } from "../common/PooledTask";
import { Problem, Submission } from "../api";
import * as LocalStorage from "../common/LocalStorage";

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
      return state.set(url, createTask(url));
    }
    case SOLVE_TASK: {
      const { key, solvedSecond, reviewSecond } = action;
      const oldTask = state.get(key);
      if (oldTask) {
        const newTask = {
          ...oldTask,
          lastSolvedByUser: solvedSecond,
          nextReviewTime: reviewSecond
        };
        return state.set(key, newTask);
      } else {
        return state;
      }
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

const refineTask = (
  task: PooledTask,
  submissions: Map<string, List<Submission>>
) => {
  if (task.validUrl === null) {
    return task;
  }
  const list = submissions.get(task.validUrl);
  if (list === undefined) {
    return task;
  }
  const lastJudgeAccepted = list
    .filter(s => s.result === "Accepted" && s.creationTimeSecond !== null)
    .map(s => s.creationTimeSecond)
    .max();
  if (lastJudgeAccepted) {
    return { ...task, lastJudgeAccepted };
  } else {
    return task;
  }
};

const initialize = (): State => ({
  tasks: LocalStorage.loadTasks(),
  userIds: LocalStorage.loadUserIds(),
  submissions: Map(),
  problems: Map()
});

const rootReducer = (state: State = initialize(), action: Action): State => {
  console.log(action);
  const userIds = userIdsReducer(state.userIds, action);
  const submissions = submissionReducer(state.submissions, action);
  const problems = problemReducer(state.problems, action);
  const tasks = taskReducer(state.tasks, action);
  const refinedTasks = tasks.map(task => refineTask(task, submissions));
  return { tasks: refinedTasks, userIds, submissions, problems };
};

export default rootReducer;
