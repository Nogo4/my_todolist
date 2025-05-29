import Task from "./task";
import type { Column, TaskType } from "../pages/Todo";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import CreateTask from "./CreateTask";

type ColumnProps = {
  column: Column;
  tasks: TaskType[];
  remove_task: (id: number) => void;
  fetchTasks: () => void;
};

export function Columns({
  column,
  tasks,
  remove_task,
  fetchTasks,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const [showForm, setShowForm] = useState(false);

  return (
    <div
      ref={setNodeRef}
      className="flex w-100 flex-col gap-4 rounded-lg bg-gray-600 p-4 shadow-md min-h-[200px]"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{column.label}</h2>

        {column.id === 0 && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-sm btn-primary"
          >
            + Create
          </button>
        )}
      </div>

      {column.id === 0 && showForm && (
        <div className="animate-fade-down animate-duration-300 animate-ease-in-out">
          <div className="bg-base-200 rounded-lg p-3 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">New task</h3>
              <button
                onClick={() => setShowForm(false)}
                className="btn btn-xs btn-circle"
              >
                ✕
              </button>
            </div>
            <CreateTask
              fetchTasks={() => {
                fetchTasks();
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <Task
            remove_task={remove_task}
            key={task.id}
            id={task.id}
            taskName={task.taskName}
            taskDescription={task.description}
            taskStatus={task.status as string}
          />
        ))}
      </div>
    </div>
  );
}
