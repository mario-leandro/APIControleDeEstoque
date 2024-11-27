import { FastifyInstance } from "fastify";
import {
  getClientes,
  getClientePorId,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/clienteController";

async function clienteRoutes(fastify: FastifyInstance) {
  fastify.get("/clientes", getClientes);
  fastify.get("/clientes/:id", getClientePorId);
  fastify.post("/clientes", createCliente);
  fastify.put("/clientes/:id", updateCliente);
  fastify.delete("/clientes/:id", deleteCliente);
}

export default clienteRoutes;
