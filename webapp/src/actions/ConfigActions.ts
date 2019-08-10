import { UserIds } from "../common";

export const SAVE_USER_IDS = "SAVE_USER_IDS";

export const saveUserIds = (userIds: UserIds) => ({
  type: SAVE_USER_IDS as typeof SAVE_USER_IDS,
  userIds
});

export type ConfigActionType = ReturnType<typeof saveUserIds>;
