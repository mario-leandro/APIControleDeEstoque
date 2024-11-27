// controllers/pedidoCompraController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma";
import { PedidoCompra } from "../types/interfaces";

export const getPedidosCompra = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const pedidos = await prisma.pedidoCompra.findMany({
      include: { produtos: true },
    });
    reply.send(pedidos);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar pedidos de compra" });
  }
};

export const getPedidosCompraById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const pedido = await prisma.pedidoCompra.findUnique({
      where: { id: Number(id) },
      include: { produtos: true },
    });

    if (!pedido) {
      return reply
        .status(404)
        .send({ error: "Pedido de compra não encontrado" });
    }

    reply.send(pedido);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar pedido de compra" });
  }
};

export const createPedidoCompra = async (
  request: FastifyRequest<{ Body: PedidoCompra }>,
  reply: FastifyReply
) => {
  try {
    const { produtos, ...pedidoData } = request.body;

    let valorTotal = 0;

    for (const produto of produtos) {
      const produtoDb = await prisma.produto.findUnique({
        where: { id: produto.produtoId },
        select: { precoCusto: true },
      });

      if (!produtoDb) {
        return reply.status(400).send({ error: "Produto não encontrado" });
      }

      valorTotal += produtoDb.precoCusto * produto.quantidade;
    }

    const pedido = await prisma.pedidoCompra.create({
      data: {
        ...pedidoData,
        valorTotal,
        produtos: {
          create: produtos.map((produto) => ({
            produto: {
              connect: { id: produto.produtoId },
            },
            quantidade: produto.quantidade,
          })),
        },
      },
      include: {
        produtos: true,
      },
    });

    reply.status(201).send(pedido);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Erro ao criar pedido de compra" });
  }
};

export const updatePedidoCompra = async (
  request: FastifyRequest<{ Params: { id: string }; Body: PedidoCompra }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const { produtos, ...pedidoData } = request.body;

    let valorTotal = 0;

    for (const produto of produtos) {
      const produtoDb = await prisma.produto.findUnique({
        where: { id: produto.produtoId },
        select: { precoCusto: true },
      });

      if (!produtoDb) {
        return reply.status(400).send({ error: "Produto não encontrado" });
      }

      valorTotal += produtoDb.precoCusto * produto.quantidade;
    }

    const pedido = await prisma.pedidoCompra.update({
      where: { id: Number(id) },
      data: {
        ...pedidoData,
        valorTotal,
        produtos: {
          deleteMany: {},
          create: produtos.map((produto) => ({
            produto: {
              connect: { id: produto.produtoId },
            },
            quantidade: produto.quantidade,
          })),
        },
      },
      include: {
        produtos: true,
      },
    });

    reply.send(pedido);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Erro ao atualizar pedido de compra" });
  }
};

export const deletePedidoCompra = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    await prisma.pedidoCompra.delete({ where: { id: Number(id) } });
    reply.send({ message: "Pedido de compra deletado com sucesso" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Erro ao deletar pedido de compra" });
  }
};