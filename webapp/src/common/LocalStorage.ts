import { UserIds } from "./index";

const USER_IDS = "USER_IDS";

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
