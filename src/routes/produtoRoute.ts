import { FastifyInstance } from "fastify";
import {
  createProduto,
  getProdutos,
  getProdutoPorId,
  updateProduto,
  deleteProduto,
} from "../controllers/produtoController";

async function produtoRoutes(fastify: FastifyInstance) {
  fastify.post("/produtos", createProduto);
  fastify.get("/produtos", getProdutos);
  fastify.get("/produtos/:id", getProdutoPorId);
  fastify.put("/produtos/:id", updateProduto);
  fastify.delete("/produtos/:id", deleteProduto);
}

export default produtoRoutes;
