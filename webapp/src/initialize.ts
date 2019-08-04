import { State } from "./common";
import { List, Map } from "immutable";
import * as LocalStorage from "./common/LocalStorage";

export const initialize = (): State => ({
  tasks: List(),
  userIds: LocalStorage.loadUserIds(),
  submissions: Map(),
  problems: Map()
});
