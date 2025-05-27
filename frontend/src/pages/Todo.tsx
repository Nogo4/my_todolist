import Task from "../components/task";
import { treaty } from "@elysiajs/eden";
import type { BackendApp } from "../../../backend/index.ts";
import { client } from "./Login";
import { useEffect, useState } from "react";
import type { TaskStatus } from "../../../backend/generated/prisma";

function Todo() {
  const [, setTasks] = useState<
    {
      status: TaskStatus;
      id: number;
      userId: number;
      taskName: string;
      description: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchTasks = async () => {
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
    fetchTasks();
  }, []);
  return (
    <>
      <div className="Todo"></div>
    </>
  );
}

export default Todo;
