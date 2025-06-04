import React, { useState } from "react";
import { Card, Col, Row, Typography } from "antd";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

const { Title } = Typography;

const initialTasks = {
  Pending: [
    { id: "1", title: "Set up project repo" },
    { id: "2", title: "Create basic layout" },
  ],
  "In Progress": [
    { id: "3", title: "Design login form" },
  ],
  Completed: [
    { id: "4", title: "Initialize Node backend" },
  ],
};

const TasksPage = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceList = [...tasks[source.droppableId]];
    const [movedTask] = sourceList.splice(source.index, 1);
    const destinationList = [...tasks[destination.droppableId]];
    destinationList.splice(destination.index, 0, movedTask);

    setTasks((prev) => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    }));
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Task Manager</Title>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={16}>
          {Object.entries(tasks).map(([status, taskList]) => (
            <Col key={status} xs={24} sm={12} md={8}>
              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: snapshot.isDraggingOver ? "#f0f5ff" : "#fafafa",
                      padding: 16,
                      minHeight: 400,
                      borderRadius: 8,
                      border: "1px solid #d9d9d9",
                    }}
                  >
                    <Title level={4}>{status}</Title>
                    {taskList.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              marginBottom: 16,
                              background: snapshot.isDragging ? "#e6f7ff" : "#ffffff",
                              boxShadow: snapshot.isDragging ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                              borderRadius: 8,
                              transition: "all 0.2s ease",
                              cursor: "grab",
                            }}
                          >
                            {task.title}
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </div>
  );
};

export default TasksPage;
