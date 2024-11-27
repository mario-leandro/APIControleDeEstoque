import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma";
import { MovimentoEstoque } from "../types/interfaces";

export const getMovimentosEstoque = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const movimentos = await prisma.movimentoEstoque.findMany();
    reply.send(movimentos);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar movimentos de estoque" });
  }
};

export const getMovimentosEstoquePorId = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const movimento = await prisma.movimentoEstoque.findUnique({
      where: {
        id: parseInt(request.params.id),
      },
    });
    if (!movimento) {
      reply.status(404).send({ error: "Movimento de estoque não encontrado" });
    }
    reply.send(movimento);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar movimento de estoque" });
  }
};

export const createMovimentoEstoque = async (
  request: FastifyRequest<{ Body: MovimentoEstoque }>,
  reply: FastifyReply
) => {
  try {
    const movimento = await prisma.movimentoEstoque.create({
      data: request.body,
    });
    reply.status(201).send(movimento);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao criar movimento de estoque" });
  }
};

export const updateMovimentoEstoque = async (
  request: FastifyRequest<{ Body: MovimentoEstoque; Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const movimento = await prisma.movimentoEstoque.update({
      where: {
        id: parseInt(request.params.id),
      },
      data: request.body,
    });
    reply.send(movimento);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao atualizar movimento de estoque" });
  }
};

export const deleteMovimentoEstoque = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    await prisma.movimentoEstoque.delete({
      where: {
        id: parseInt(request.params.id),
      },
    });
    reply.send({ message: "Movimento de estoque deletado com sucesso" });
  } catch (error) {
    reply.status(500).send({ error: "Erro ao deletar movimento de estoque" });
  }
};
