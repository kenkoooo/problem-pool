export interface Submission {
  readonly url: string;
  readonly userId: string;
  readonly result: "Accepted" | "Rejected";
  readonly problemUrl: string;
}

export interface Problem {
  readonly url: string;
  readonly title: string;
}
