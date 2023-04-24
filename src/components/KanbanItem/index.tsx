import { Draggable } from "react-beautiful-dnd";
import "./kanban-item.css";
import { Card, Col, Row } from "antd";
import { Issue } from "../../types/Issue";
import moment from "moment";

interface KanbanItemProps {
  data: Issue;
  index: number;
}

const KanbanItem = ({ data, index }: KanbanItemProps) => {
  return (
    <Draggable key={data.id} draggableId={String(data.id)} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="item"
          title={data.title}
          placeholder={data.title}
        >
          <Row>
            <Col span={6}>
              <span>#{data.id}</span>
            </Col>
            <Col span={16} offset={2}>
              <span>Opened {moment(data.created_at).fromNow()}</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {data.user ? (
                <span>{data.user.login}</span>
              ) : (
                <span>Unknown</span>
              )}
            </Col>
            <Col span={16} offset={2}>
              <span>Comments: {data.comments}</span>
            </Col>
          </Row>
        </Card>
      )}
    </Draggable>
  );
};

export default KanbanItem;
