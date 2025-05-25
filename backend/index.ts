import { Elysia } from "elysia";
import { auth } from "./src/auth";
import swagger from "@elysiajs/swagger";
import { todo } from "./src/todo";

const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .use(auth)
  .use(todo)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
