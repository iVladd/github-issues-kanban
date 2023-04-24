import { RootState } from "../store";

export const selectDone = (state: RootState) => state.issues.done;
export const selectInProgress = (state: RootState) => state.issues.inProgress;
export const selectTodo = (state: RootState) => state.issues.todo;

export const selectSearch = (state: RootState) => state.issues.search;
export const selectError = (state: RootState) => state.issues.error;
