import { State } from "./common";
import { Map } from "immutable";
import * as LocalStorage from "./common/LocalStorage";

export const initialize = (): State => ({
  tasks: Map(),
  userIds: LocalStorage.loadUserIds(),
  submissions: Map(),
  problems: Map()
});
