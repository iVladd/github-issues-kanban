import { useEffect } from "react";
import { Row } from "antd";
import KanbanColumn from "../KanbanColumn";
import useIssues from "../../redux/issuesSlice/useIssues";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppDispatch } from "../../redux/store";
import {
  getFromLocalStorage,
  loadIssues,
  setSearch,
  updateStates,
} from "../../redux/issuesSlice/issuesSlice";
import useSearch from "../../redux/issuesSlice/useSearch";
import { getOwnerAndRepo } from "../../utils/getOwnerAndRepo";
import "./kanban-container.css";

const KanbanContainer = () => {
  const [done, inProgress, todo, error] = useIssues();
  const dispatch = useAppDispatch();
  const [search] = useSearch();

  useEffect(() => {
    if (!search) return;
    if (window.localStorage.getItem(search)) {
      dispatch(getFromLocalStorage(search));
    } else {
      dispatch(setSearch(search));
      dispatch(loadIssues(getOwnerAndRepo(search)));
    }
  }, [dispatch, search]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    dispatch(updateStates(result));
  };

  return !error ? (
    <Row
      style={{ height: "100vh", marginTop: "20px" }}
      justify={"space-around"}
    >
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <KanbanColumn label="To Do" id={"todo"} data={todo} />
        <KanbanColumn label="In Progress" id={"inProgress"} data={inProgress} />
        <KanbanColumn label="Done" id={"done"} data={done} />
      </DragDropContext>
    </Row>
  ) : (
    <div className="error-container">
      <h1>{error}</h1>
    </div>
  );
};

export default KanbanContainer;
