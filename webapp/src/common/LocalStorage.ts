import { UserIds } from "./index";
import { Map } from "immutable";
import { PooledTask } from "./PooledTask";
import { parseToken } from "./Token";

const USER_IDS = "USER_IDS";
const TASKS = "TASKS";
const TOKEN = "TOKEN";

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

export const saveToken = (token: string) => localStorage.setItem(TOKEN, token);
export const loadToken = () => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    return parseToken(token);
  } else {
    return null;
  }
};
