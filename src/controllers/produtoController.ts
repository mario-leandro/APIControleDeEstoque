import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma";
import { Produto } from "../types/interfaces";

export const getProdutos = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const produtos = await prisma.produto.findMany();
    reply.send(produtos);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar produtos" });
  }
};

export const getProdutoPorId = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });
    if (!produto) {
      reply.status(404).send({ error: "Produto não encontrado" });
      return;
    }
    reply.send(produto);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar produto" });
  }
};

export const createProduto = async (
  request: FastifyRequest<{ Body: Produto }>,
  reply: FastifyReply
) => {
  try {
    const produto = await prisma.produto.create({
      data: request.body,
    });
    reply.status(201).send(produto);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao criar produto" });
  }
};

export const updateProduto = async (
  request: FastifyRequest<{ Params: { id: string }; Body: Produto }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: request.body,
    });
    reply.send(produto);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao atualizar produto" });
  }
};

export const deleteProduto = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    await prisma.produto.delete({
      where: { id: Number(id) },
    });
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: "Erro ao deletar produto" });
  }
};
