import { State, UserIds } from "./common";
import { generateTask, PooledTask } from "./common/PooledTask";
import { List, Map } from "immutable";
import Action from "./actions";
import { Problem, Submission } from "./api";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "./actions/TaskActions";
import { SAVE_USER_IDS } from "./actions/ConfigActions";
import {
  RECEIVE_PROBLEMS,
  RECEIVE_SUBMISSIONS
} from "./actions/ExternalApiActions";
import * as LocalStorage from "./common/LocalStorage";
const initialize = (): State => {
  const savedData = LocalStorage.getSaveData();
  if (savedData === undefined) {
    // TODO remove this line in the future.
    const item = localStorage.getItem("TASKS");
    const tasks = item
      ? Map<string, PooledTask>(JSON.parse(item))
      : Map<string, PooledTask>();

    return {
      tasks: tasks,
      userIds: {
        atcoder: "",
        codeforces: "",
        aoj: "",
        yukicoder: ""
      },
      submissions: Map(),
      problems: Map()
    };
  } else {
    return {
      submissions: Map(),
      problems: Map(),
      ...savedData
    };
  }
};

const tasksReducer = (tasks: Map<string, PooledTask>, action: Action) => {
  switch (action.type) {
    case CREATE_TASK: {
      const { input } = action;
      const task = generateTask(input);
      if (tasks.has(task.key)) {
        return tasks;
      } else {
        return tasks.set(task.key, task);
      }
    }
    case DELETE_TASK: {
      const { key } = action;
      return tasks.remove(key);
    }
    case UPDATE_TASK: {
      const { key, solvedSecond, nextReviewSecond } = action;
      const item = tasks.get(key);
      if (item === undefined) {
        return tasks;
      } else {
        const updated = {
          ...item,
          lastSolvedByUser: solvedSecond,
          nextReviewTime: nextReviewSecond
        };
        return tasks.set(key, updated);
      }
    }
    default: {
      return tasks;
    }
  }
};

const userIdsReducer = (userIds: UserIds, action: Action) => {
  switch (action.type) {
    case SAVE_USER_IDS: {
      const { userIds } = action;
      return userIds;
    }
    default: {
      return userIds;
    }
  }
};

const problemsReducer = (problems: Map<string, Problem>, action: Action) => {
  switch (action.type) {
    case RECEIVE_PROBLEMS: {
      return problems.merge(action.problems.map(p => [p.url, p]));
    }
    default: {
      return problems;
    }
  }
};

const submissionsReducer = (
  submissions: Map<string, List<Submission>>,
  action: Action
) => {
  switch (action.type) {
    case RECEIVE_SUBMISSIONS: {
      const { submissions: received } = action;
      const receivedMap = received.reduce(
        (map, s) => map.update(s.problemUrl, List(), list => list.push(s)),
        Map<string, List<Submission>>()
      );
      return submissions.mergeWith(
        (oldList, newList) => oldList.merge(newList),
        receivedMap
      );
    }
    default: {
      return submissions;
    }
  }
};

const rootReducer = (state: State = initialize(), action: Action): State => {
  console.log(action);
  return {
    tasks: tasksReducer(state.tasks, action),
    userIds: userIdsReducer(state.userIds, action),
    submissions: submissionsReducer(state.submissions, action),
    problems: problemsReducer(state.problems, action)
  };
};
export default rootReducer;
