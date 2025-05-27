import Task from "./task";
import type { Column, TaskType } from "../pages/Todo";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  column: Column;
  tasks: TaskType[];
};

export function Columns({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-80 flex-col gap-4 rounded-lg bg-gray-100 p-4 shadow-md">
      <h2 className="text-xl font-semibold">{column.label}</h2>
      <div ref={setNodeRef} className="flex flex-col gap-2">
        {tasks.map((task) => (
          <Task
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
