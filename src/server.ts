import Fastify from "fastify";
import cors from "@fastify/cors";
import prisma from "./prisma";
import produtoRoutes from "./routes/produtoRoute";
import fornecedorRoutes from "./routes/fornecedorRoute";
import pedidoCompraRoutes from "./routes/pedidoCompraRoute";
import movimentoEstoqueRoutes from "./routes/movimentoEstoqueRoute";
import vendaRoutes from "./routes/vendaRoute";
import clienteRoutes from "./routes/clienteRoute";

const server = Fastify();

server.register(cors, {
  origin: "http://localhost:3000",
});

server.register(produtoRoutes);
server.register(fornecedorRoutes);
server.register(pedidoCompraRoutes);
server.register(movimentoEstoqueRoutes);
server.register(vendaRoutes);
server.register(clienteRoutes);

const start = async () => {
  try {
    await prisma.$connect();
    await server.listen({ port: 8080 });
    console.log("Servidor rodando em http://localhost:8080");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
