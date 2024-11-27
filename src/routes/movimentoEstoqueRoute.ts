import { FastifyInstance } from "fastify";
import {
  getMovimentosEstoque,
  getMovimentosEstoquePorId,
  createMovimentoEstoque,
  updateMovimentoEstoque,
  deleteMovimentoEstoque,
} from "../controllers/movimentoEstoqueController";

async function movimentoEstoqueRoutes(fastify: FastifyInstance) {
  fastify.get("/movimento-estoque", getMovimentosEstoque);
  fastify.get("/movimento-estoque/:id", getMovimentosEstoquePorId);
  fastify.post("/movimento-estoque", createMovimentoEstoque);
  fastify.put("/movimento-estoque/:id", updateMovimentoEstoque);
  fastify.delete("/movimento-estoque/:id", deleteMovimentoEstoque);
}

export default movimentoEstoqueRoutes;
