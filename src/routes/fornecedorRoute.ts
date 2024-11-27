import { FastifyInstance } from "fastify";
import {
  createFornecedor,
  getFornecedores,
  getFornecedoresPorId,
  updateFornecedor,
  deleteFornecedor,
} from "../controllers/fornecedorController";

async function fornecedorRoutes(fastify: FastifyInstance) {
  fastify.post("/fornecedores", createFornecedor);
  fastify.get("/fornecedores", getFornecedores);
  fastify.get("/fornecedores/:id", getFornecedoresPorId);
  fastify.put("/fornecedores/:id", updateFornecedor);
  fastify.delete("/fornecedores/:id", deleteFornecedor);
}

export default fornecedorRoutes;
