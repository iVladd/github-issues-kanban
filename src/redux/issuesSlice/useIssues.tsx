import { useSelector } from "react-redux";
import {
  selectDone,
  selectError,
  selectInProgress,
  selectTodo,
} from "./issuesSelectors";
import { Issue } from "../../types/Issue";

const useIssues = (): [Issue[], Issue[], Issue[], string | null] => {
  const done = useSelector(selectDone);
  const inPorgress = useSelector(selectInProgress);
  const todo = useSelector(selectTodo);
  const error = useSelector(selectError);

  return [done, inPorgress, todo, error];
};

export default useIssues;
