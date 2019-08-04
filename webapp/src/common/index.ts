import { List, Map } from "immutable";
import { Problem, Submission } from "../api";
import { PooledTask } from "./PooledTask";

export type OnlineJudge = "AtCoder" | "Codeforces" | "yukicoder" | "AOJ";

export interface UserIds {
  readonly atcoder: string;
  readonly codeforces: string;
  readonly aoj: string;
  readonly yukicoder: string;
}

export interface State {
  readonly tasks: List<PooledTask>;
  readonly userIds: UserIds;
  readonly submissions: Map<[string, string], Submission>;
  readonly problems: Map<string, Problem>;
}
