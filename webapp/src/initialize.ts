import { State } from "./common";
import { List } from "immutable";
import * as LocalStorage from "./common/LocalStorage";

export const initialize = (): State => ({
  tasks: List(),
  userIds: LocalStorage.loadUserIds(),
  submissionPool: {
    codeforces: List()
  },
  problemPool: {
    atcoder: List()
  }
});
