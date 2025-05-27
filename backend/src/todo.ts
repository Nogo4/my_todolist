import Elysia, { status, t } from "elysia";
import { authJWT } from "./auth";
import { prisma } from "./prismaDb";
import { TaskStatus } from "../generated/prisma";

export const todo = new Elysia({ name: "todos"})
  .use(authJWT)
  .get(
    "/todos",
    async ({ jwt, headers: { authorization } }) => {
      const value = (await jwt.verify(authorization)) as { id: number };
      if (!value) return status("Unauthorized");
      return await prisma.task.findMany({ where: { userId: value.id } });
    },
    {
      headers: t.Object({
        authorization: t.String(),
      }),
    }
  )
  .post(
    "/create_task",
    async ({ jwt, body, headers: { authorization } }) => {
      const value = (await jwt.verify(authorization)) as { id: number };
      if (!value) return status("Unauthorized");
      try {
        const createdTask = await prisma.task.create({
          data: {
            taskName: body.taskName,
            description: body.description,
            user: {
              connect: { id: value.id },
            },
          },
        });

        return createdTask;
      } catch (error) {
        console.error(error);
        return new Response("Fail to create task", {
          status: 500,
        });
      }
    },
    {
      body: t.Object({
        taskName: t.String(),
        description: t.String(),
      }),
    }
  )
  .post(
    "/delete_task",
    async ({ jwt, body, headers: { authorization } }) => {
      const value = (await jwt.verify(authorization)) as { id: number };
      if (!value) return status("Unauthorized");
      await prisma.task.deleteMany({
        where: { id: body.taskId, userId: value.id },
      });
      return status("OK");
    },
    {
      body: t.Object({
        taskId: t.Integer(),
      }),
    }
  )
  .post(
    "/edit_task_status",
    async ({ jwt, body, headers: { authorization } }) => {
      const value = (await jwt.verify(authorization)) as { id: number };
      if (!value) return status("Unauthorized");
      const taskStatus = await prisma.task.updateMany({
        where: { id: body.taskId, userId: value.id },
        data: {
          status: body.status,
        },
      });
      return taskStatus;
    },
    {
      body: t.Object({
        taskId: t.Integer(),
        status: t.Enum(TaskStatus),
      }),
    }
  );
