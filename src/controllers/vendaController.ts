// controllers/vendaController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma";
import { Venda } from "../types/interfaces";
import { request } from "http";

export const getVendas = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const vendas = await prisma.venda.findMany({
      include: { produtos: true },
    });
    reply.send(vendas);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar vendas" });
  }
};

export const getVendaPorId = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const venda = await prisma.venda.findUnique({
      where: { id: Number(id) },
      include: { produtos: true },
    });
    if (!venda) {
      reply.status(404).send({ error: "Venda não encontrada" });
      return;
    }
    reply.send(venda);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar venda" });
  }
};

export const createVenda = async (request: FastifyRequest<{ Body: Venda }>, reply: FastifyReply) => {
  try {
    const { produtos, ...vendaData } = request.body;

    const produtosDetalhes = await Promise.all(
      produtos.map(async produto => {
        const produtoDetalhe = await prisma.produto.findUnique({
          where: { id: produto.produtoId },
        });
        if (!produtoDetalhe) {
          throw new Error(`Produto com id ${produto.produtoId} não encontrado.`);
        }
        return {
          ...produto,
          precoVenda: produtoDetalhe.precoVenda,
        };
      })
    );

    const valorTotal = produtosDetalhes.reduce((total, produto) => {
      return total + produto.precoVenda * produto.quantidade;
    }, 0);

    const venda = await prisma.venda.create({
      data: {
        ...vendaData,
        valorTotal,
        produtos: {
          create: produtos.map(produto => ({
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

    reply.status(201).send(venda);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao criar venda' });
  }
};

export const updateVenda = async (
  request: FastifyRequest<{ Body: Venda; Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const { produtos, ...vendaData } = request.body;
    const venda = await prisma.venda.findUnique({
      where: { id: Number(id) },
    });
    if (!venda) {
      reply.status(404).send({ error: "Venda não encontrada" });
      return;
    }

    const produtosDetalhes = await Promise.all(
      produtos.map(async produto => {
        const produtoDetalhe = await prisma.produto.findUnique({
          where: { id: produto.produtoId },
        });
        if (!produtoDetalhe) {
          throw new Error(`Produto com id ${produto.produtoId} não encontrado.`);
        }
        return {
          ...produto,
          precoVenda: produtoDetalhe.precoVenda,
        };
      })
    );

    const valorTotal = produtosDetalhes.reduce((total, produto) => {
      return total + produto.precoVenda * produto.quantidade;
    }, 0);

    await prisma.venda.update({
      where: { id: Number(id) },
      data: {
        ...vendaData,
        valorTotal,
        produtos: {
          deleteMany: {},
          create: produtos.map(produto => ({
            produto: {
              connect: { id: produto.produtoId },
            },
            quantidade: produto.quantidade,
          })),
        },
      },
    });

    reply.send({ message: "Venda atualizada com sucesso" });
  }
  catch (error) {
    reply.status(500).send({ error: "Erro ao atualizar venda" });
  }
};

export const deleteVenda = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const venda = await prisma.venda.findUnique({
      where: { id: Number(id) },
    });
    if (!venda) {
      reply.status(404).send({ error: "Venda não encontrada" });
      return;
    }
    await prisma.venda.delete({
      where: { id: Number(id) },
    });
    reply.send({ message: "Venda deletada com sucesso" });
  } catch (error) {
    reply.status(500).send({ error: "Erro ao deletar venda" });
  }
};