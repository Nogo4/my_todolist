import { useEffect, useState } from "react";
import type { TaskStatus } from "../../../backend/generated/prisma";
import { client } from "./Login";
import { Columns } from "../components/Columns";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  MeasuringStrategy,
} from "@dnd-kit/core";

export type Column = {
  id: number;
  label: string;
  status: string;
};

export type TaskType = {
  status: TaskStatus | string;
  id: number;
  userId: number;
  taskName: string;
  description: string;
};

const COLUMNS: Column[] = [
  { id: 0, label: "Todo", status: "TODO" },
  { id: 1, label: "In Progress", status: "IN_PROGRESS" },
  { id: 2, label: "Done", status: "DONE" },
];

function Todo() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const taskId = active.id as number;
    const columnId = over.id as number;
    const column = COLUMNS.find((col) => col.id === columnId);
    if (!column) {
      return;
    }
    let newStatus: TaskStatus;
    if (column.status === "TODO") {
      newStatus = "TODO";
    } else if (column.status === "IN_PROGRESS") {
      newStatus = "IN_PROGRESS";
    } else if (column.status === "DONE") {
      newStatus = "DONE";
    } else {
      console.error("Invalid status:", column.status);
      return;
    }

    console.log("Sending status update:", { taskId, newStatus });

    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );

    const token = localStorage.getItem("token") || "";

    client.edit_task_status
      .post(
        {
          taskId: taskId,
          status: newStatus,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((response) => {
        console.log("API Response:", response);
        if (response.error) {
          console.error("Server error:", response.error);
        }
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
        fetchTasks();
      });
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    console.log("coucou");
    try {
      const token = localStorage.getItem("token") || "";
      const response = await client.todos.get({
        headers: {
          authorization: token,
        },
      });
      if (response.data) {
        console.log("Tasks received:", response.data);
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
        >
          {COLUMNS.map((column) => (
            <Columns
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => {
                if (task.status === "TODO") return column.id === 0;
                if (task.status === "IN_PROGRESS") return column.id === 1;
                if (task.status === "DONE") return column.id === 2;
                return false;
              })}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}

export default Todo;
