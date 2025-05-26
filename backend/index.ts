import Elysia from "elysia";
import cors from "@elysiajs/cors";
import { auth } from "./src/auth";
import { todo } from "./src/todo";

const app = new Elysia().use(cors()).use(auth).use(todo).listen(3000);

export type BackendApp = typeof app;

console.log(
  `My_ToDoList is running at ${app.server?.hostname}:${app.server?.port}`
);
