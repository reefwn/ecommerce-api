import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "E-Commerce API",
          version: "1.0.0",
        }
      }
    })
  )
  .get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
