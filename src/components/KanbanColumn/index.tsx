import { Col, Typography, Space } from "antd";
import KanbanItem from "../KanbanItem";
import { Issue } from "../../types/Issue";
import { Droppable } from "react-beautiful-dnd";
import "./kanban-column.css";
import { ColumnId } from "../../types/columns";

interface KanbanColumnProps {
  label: string;
  data: Issue[];
  id: ColumnId;
}

const KanbanColumn = ({ label, data, id }: KanbanColumnProps) => {
  return (
    <Col span={7}>
      <Space
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <Typography.Text strong style={{ fontSize: "32px" }}>
          {label}
        </Typography.Text>
      </Space>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data &&
              data.map((i, index) => (
                <KanbanItem key={i.id} index={index} data={i} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default KanbanColumn;
