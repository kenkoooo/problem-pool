import { State } from "./common";
import { Map } from "immutable";
import * as LocalStorage from "./common/LocalStorage";

const initialize = (): State => ({
  tasks: LocalStorage.loadTasks(),
  userIds: LocalStorage.loadUserIds(),
  submissions: Map(),
  problems: Map()
});

export default initialize;
