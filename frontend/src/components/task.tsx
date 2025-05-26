type TaskProps = {
  taskName: string;
  taskDescription: string;
  taskStatus: number;
};

export default function Task({
  taskName,
  taskDescription,
  taskStatus,
}: TaskProps) {
  const statusMap = [
    { label: "Todo", badge: "badge-secondary" },
    { label: "In progress", badge: "badge-warning" },
    { label: "Done", badge: "badge-success" },
  ];

  const status = statusMap[taskStatus] || {
    label: "Unknown",
    badge: "badge-neutral",
  };

  return (
    <div className="card bg-base-200 shadow-md mb-4">
      <div className="card-body">
        <h3 className="card-title">{taskName}</h3>
        <p>{taskDescription}</p>
        <span className={`badge ${status.badge}`}>{status.label}</span>
      </div>
    </div>
  );
}
