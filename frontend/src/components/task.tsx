import { useDraggable } from "@dnd-kit/core";

type TaskProps = {
  id: number;
  taskName: string;
  taskDescription: string;
  taskStatus: string;
};

export default function Task({
  id,
  taskName,
  taskDescription,
  taskStatus,
}: TaskProps) {
  let badgeClass = "badge-neutral";
  let statusLabel = "Unknown";

  if (taskStatus === "TODO") {
    badgeClass = "badge-secondary";
    statusLabel = "Todo";
  } else if (taskStatus === "IN_PROGRESS") {
    badgeClass = "badge-warning";
    statusLabel = "In progress";
  } else if (taskStatus === "DONE") {
    badgeClass = "badge-success";
    statusLabel = "Done";
  }

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="card bg-base-100 shadow-md mb-4"
    >
      <div className="card-body">
        <h3 className="card-title">{taskName}</h3>
        <p>{taskDescription}</p>
        <span className={`badge ${badgeClass}`}>{statusLabel}</span>
      </div>
    </div>
  );
}
