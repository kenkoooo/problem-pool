import { State, UserIds } from "./common";
import { PooledTask } from "./common/PooledTask";
import { List, Map } from "immutable";
import Action from "./actions";
import { Problem, Submission } from "./api";
import { Token } from "./common/Token";

const initialize = (): State => ({
  tasks: Map<string, PooledTask>(),
  userIds: {
    atcoder: "",
    codeforces: "",
    aoj: "",
    yukicoder: ""
  },
  submissions: Map(),
  problems: Map(),
  token: undefined
});

const tasksReducer = (tasks: Map<string, PooledTask>, action: Action) => tasks;

const userIdsReducer = (userIds: UserIds, action: Action) => userIds;

const problemsReducer = (problems: Map<string, Problem>, action: Action) =>
  problems;

const submissionsReducer = (
  submissions: Map<string, List<Submission>>,
  action: Action
) => submissions;

const tokenReducer = (token: Token | undefined, action: Action) => token;

const rootReducer = (state: State = initialize(), action: Action): State => {
  return {
    tasks: tasksReducer(state.tasks, action),
    userIds: userIdsReducer(state.userIds, action),
    submissions: submissionsReducer(state.submissions, action),
    problems: problemsReducer(state.problems, action),
    token: tokenReducer(state.token, action)
  };
};
export default rootReducer;
