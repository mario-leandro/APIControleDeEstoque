import { FastifyInstance } from "fastify";
import {
  getVendas,
  getVendaPorId,
  createVenda,
  updateVenda,
  deleteVenda,
} from "../controllers/vendaController";

async function vendaRoutes(fastify: FastifyInstance) {
  fastify.get("/vendas", getVendas);
  fastify.get("/vendas/:id", getVendaPorId);
  fastify.post("/vendas", createVenda);
  fastify.put("/vendas/:id", updateVenda);
  fastify.delete("/vendas/:id", deleteVenda);
}

export default vendaRoutes;
