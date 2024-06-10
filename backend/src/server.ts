import fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";

const app = fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(routes);
  await app.register(cors);

  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3333;
    await app.listen({ port });
  } catch (err) {
    process.exit(1);
  }
};

start();

export default app;
