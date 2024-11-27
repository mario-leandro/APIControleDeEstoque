import { FastifyInstance } from "fastify";
import {
  getPedidosCompra,
  getPedidosCompraById,
  createPedidoCompra,
  updatePedidoCompra,
  deletePedidoCompra,
} from "../controllers/pedidoCompraController";

async function pedidoCompraRoutes(fastify: FastifyInstance) {
  fastify.post("/pedido-compra", createPedidoCompra);
  fastify.get("/pedido-compra", getPedidosCompra);
  fastify.get("/pedido-compra/:id", getPedidosCompraById);
  fastify.put("/pedido-compra/:id", updatePedidoCompra);
  fastify.delete("/pedido-compra/:id", deletePedidoCompra);
}

export default pedidoCompraRoutes;