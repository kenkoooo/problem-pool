import { State, UserIds } from "./index";
import { Map } from "immutable";
import { PooledTask } from "./PooledTask";
import { Token } from "./Token";

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
    return parseSaveData(item);
  }
};

export const parseSaveData = (savedString: string): SaveData | undefined => {
  try {
    const tmp = JSON.parse(savedString);
    return {
      userIds: tmp.userIds,
      tasks: Map(tmp.tasks),
      token: tmp.token
    };
  } catch (e) {
    console.error(e);
    return undefined;
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
