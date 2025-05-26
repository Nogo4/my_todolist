import { Elysia, t } from "elysia";
import { auth } from "./src/auth";
import swagger from "@elysiajs/swagger";
import { todo } from "./src/todo";

const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .use(auth)
  .use(todo)
  .listen(3000);

export type BackendApp = typeof app

console.log(
  `My_ToDoList is running at ${app.server?.hostname}:${app.server?.port}`
);
