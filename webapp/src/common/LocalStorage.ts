import { State, UserIds } from "./index";
import { Map } from "immutable";
import { PooledTask } from "./PooledTask";
import { parseToken, Token } from "./Token";

const LOCAL_STORAGE_KEY = "SAVE_DATA";

export const saveState = (state: State) => {
  const saveData = convertToSaveData(state);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveData));
};
export const getSaveData = (): SaveData | undefined => {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (item === null) {
    return undefined;
  } else {
    return JSON.parse(item) as SaveData;
  }
};

export interface SaveData {
  readonly tasks: Map<string, PooledTask>;
  readonly userIds: UserIds;
  readonly token: Token | undefined;
}

export const convertToSaveData = ({
  tasks,
  userIds,
  token
}: State): SaveData => ({
  tasks,
  userIds,
  token
});
