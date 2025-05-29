import { useState } from "react";
import { client } from "../pages/Login";

export default function CreateTask({ fetchTasks }: { fetchTasks: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = () => {
    if (name && description) {
      add_task_on_db(name, description);
    }
  };
  const add_task_on_db = async (name: string, description: string) => {
    const token = localStorage.getItem("token") || "";
    try {
      await client.create_task.post(
        {
          taskName: name,
          description: description,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
    setName("");
    setDescription("");
  };
  return (
    <div className="w-full max-w-xs mx-auto flex flex-col gap-2">
      <input
        type="text"
        name="taskName"
        placeholder="Task Name"
        className="input input-bordered w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="taskDescription"
        placeholder="Task Description"
        className="input input-bordered w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-primary w-full"
        onClick={handleSubmit}
      >
        Create Task
      </button>
    </div>
  );
}
