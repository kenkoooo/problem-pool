import { ConfigActionType } from "./ConfigActions";
import { ExternalApiActionType } from "./ExternalApiActions";
import { PoolApiActionType } from "./PoolApiActions";
import { TaskActionType } from "./TaskActions";

type Action =
  | ConfigActionType
  | ExternalApiActionType
  | PoolApiActionType
  | TaskActionType;

export default Action;
