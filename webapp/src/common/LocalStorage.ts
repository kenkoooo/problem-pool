import { UserIds } from "./index";
import { Map } from "immutable";
import { PooledTask } from "./PooledTask";

const USER_IDS = "USER_IDS";
const TASKS = "TASKS";

export const saveUserIds = (userIds: UserIds) =>
  localStorage.setItem(USER_IDS, JSON.stringify(userIds));

export const loadUserIds = (): UserIds => {
  const item = localStorage.getItem(USER_IDS);
  if (item === null) {
    return { atcoder: "", codeforces: "", yukicoder: "", aoj: "" };
  } else {
    return JSON.parse(item) as UserIds;
  }
};

export const saveTasks = (tasks: Map<string, PooledTask>) =>
  localStorage.setItem(TASKS, JSON.stringify(tasks));
export const loadTasks = (): Map<string, PooledTask> => {
  const item = localStorage.getItem(TASKS);
  if (item === null) {
    return Map<string, PooledTask>();
  } else {
    return Map<string, PooledTask>(JSON.parse(item));
  }
};
