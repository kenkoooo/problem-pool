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
  readonly tasks: Map<string, PooledTask>;
  readonly userIds: UserIds;
  readonly submissions: Map<string, List<Submission>>;
  readonly problems: Map<string, Problem>;
}

export const formatDate = (timeSecond: number) => {
  const d = new Date(timeSecond * 1000);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const date = ("0" + d.getDate()).slice(-2);
  return `${year}-${month}-${date}`;
};
