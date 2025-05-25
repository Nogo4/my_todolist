import Elysia, { status, t } from "elysia";
import { prisma } from "./prismaDb";
import jwt from "@elysiajs/jwt";

export const authJWT = jwt({
  name: "jwt",
  secret: "Fischl von Luftschloss Narfidort",
});

export const auth = new Elysia({ name: "auth" })
  .use(authJWT)
  .post(
    "/register",
    async ({ body }) => {
      const hashedPassword = await Bun.password.hash(body.password);

      await prisma.user.create({
        data: {
          username: body.username,
          password: hashedPassword,
          email: body.email,
        },
      });
      return "ok";
    },
    {
      body: t.Object({
        username: t.String({ minLength: 4, maxLength: 16 }),
        email: t.String({ format: "email" }),
        password: t.RegExp(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      }),
    }
  )
  .post(
    "/login",
    async ({ jwt, body }) => {
      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!user) return status("Unauthorized");
      const correctPassword = await Bun.password.verify(
        body.password,
        user.password
      );
      if (correctPassword) return jwt.sign({ id: user.id });
      return status("Unauthorized");
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .get("/users", async () => {
    return await prisma.user.findMany();
  });
