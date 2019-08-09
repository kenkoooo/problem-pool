import {
  Action,
  CLEAR_SUBMISSIONS,
  MERGE_TASKS,
  RECEIVE_PROBLEMS,
  RECEIVE_SUBMISSIONS,
  RECEIVE_TOKEN,
  RECEIVE_USERNAME,
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
import { parseToken, Token } from "../common/Token";

const taskReducer = (state: Map<string, PooledTask>, action: Action) => {
  switch (action.type) {
    case REMOVE_TASK: {
      const { key } = action;
      return state.remove(key);
    }
    case SUBMIT_TASK: {
      const { input } = action;
      return state.set(input, createTask(input));
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
    case MERGE_TASKS: {
      const { tasks } = action;
      return state.mergeWith((oldTask, newTask) => {
        const lastSolvedByUser =
          newTask.lastSolvedByUser && oldTask.lastSolvedByUser
            ? Math.max(newTask.lastSolvedByUser, oldTask.lastSolvedByUser)
            : newTask.lastSolvedByUser
            ? newTask.lastSolvedByUser
            : oldTask.lastSolvedByUser;
        const nextReviewTime =
          newTask.nextReviewTime && oldTask.nextReviewTime
            ? Math.max(newTask.nextReviewTime, oldTask.nextReviewTime)
            : newTask.nextReviewTime
            ? newTask.nextReviewTime
            : oldTask.nextReviewTime;

        return {
          ...newTask,
          lastSolvedByUser,
          nextReviewTime
        };
      }, tasks);
    }
    default: {
      return state;
    }
  }
};

const userIdsReducer = (state: UserIds, action: Action) => {
  switch (action.type) {
    case RECEIVE_USERNAME:
    case SAVE_USERNAME: {
      const { atcoder, codeforces, yukicoder, aoj } = action.userIds;
      return {
        atcoder: atcoder === "" ? state.atcoder : atcoder,
        codeforces: codeforces === "" ? state.codeforces : codeforces,
        aoj: aoj === "" ? state.aoj : aoj,
        yukicoder: yukicoder === "" ? state.yukicoder : yukicoder
      };
    }
    default: {
      return state;
    }
  }
};

const submissionReducer = (
  state: Map<string, List<Submission>>,
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

const problemReducer = (state: Map<string, Problem>, action: Action) => {
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

const initialize = (): State => {
  const saveData = LocalStorage.getSaveData();
  const tasks = saveData ? Map(saveData.tasks) : Map<string, PooledTask>();
  const userIds = saveData
    ? saveData.userIds
    : { atcoder: "", codeforces: "", yukicoder: "", aoj: "" };
  const token = saveData ? saveData.token : null;
  return {
    tasks,
    userIds,
    submissions: Map(),
    problems: Map(),
    token
  };
};

const tokenReducer = (state: Token | null, action: Action) => {
  switch (action.type) {
    case RECEIVE_TOKEN: {
      return parseToken(action.token);
    }
    default: {
      return state;
    }
  }
};

const rootReducer = (state: State = initialize(), action: Action): State => {
  console.log(action);
  const userIds = userIdsReducer(state.userIds, action);
  const submissions = submissionReducer(state.submissions, action);
  const problems = problemReducer(state.problems, action);
  const tasks = taskReducer(state.tasks, action);
  const token = tokenReducer(state.token, action);
  return { tasks, userIds, submissions, problems, token };
};

export default rootReducer;
