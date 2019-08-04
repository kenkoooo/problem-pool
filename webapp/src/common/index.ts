import { List } from "immutable";
import { AtCoderProblem } from "../api";
import { CodeforcesSubmission } from "../api/codeforces";

export enum OnlineJudge {
  ATCODER = "ATCODER",
  CODEFORCES = "CODEFORCES",
  YUKICODER = "YUKICODER",
  AOJ = "AOJ"
}

export interface UserIds {
  readonly atcoder: string;
  readonly codeforces: string;
  readonly aoj: string;
  readonly yukicoder: string;
}

export interface PooledTask {
  readonly url: string;
}

export interface State {
  readonly tasks: List<PooledTask>;
  readonly userIds: UserIds;
  readonly submissionPool: SubmissionPool;
  readonly problemPool: ProblemPool;
}

export interface SubmissionPool {
  codeforces: List<CodeforcesSubmission>;
}

export interface ProblemPool {
  atcoder: List<AtCoderProblem>;
}
