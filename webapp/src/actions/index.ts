import { ConfigActionType } from "./ConfigActions";
import { ExternalApiActionType } from "./ExternalApiActions";
import { TaskActionType } from "./TaskActions";

type Action = ConfigActionType | ExternalApiActionType | TaskActionType;

export default Action;
