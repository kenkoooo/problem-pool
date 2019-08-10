import { OnlineJudge } from "../common";

export interface Submission {
  readonly url: string;
  readonly userId: string;
  readonly result: "Accepted" | "Rejected";
  readonly problemUrl: string;
  readonly creationTimeSecond: number | undefined;
}

export interface Problem {
  readonly url: string;
  readonly title: string;
  readonly judge: OnlineJudge;
}
