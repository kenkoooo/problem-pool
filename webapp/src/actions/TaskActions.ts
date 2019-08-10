export const CREATE_TASK = "CREATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";

export const createTask = (input: string) => ({
  type: CREATE_TASK as typeof CREATE_TASK,
  input
});

export const deleteTask = (key: string) => ({
  type: DELETE_TASK as typeof DELETE_TASK,
  key
});

export const updateTask = (
  key: string,
  solvedSecond: number,
  nextReviewSecond: number
) => ({
  type: UPDATE_TASK as typeof UPDATE_TASK,
  key,
  solvedSecond,
  nextReviewSecond
});
export type TaskActionType =
  | ReturnType<typeof createTask>
  | ReturnType<typeof deleteTask>
  | ReturnType<typeof updateTask>;
