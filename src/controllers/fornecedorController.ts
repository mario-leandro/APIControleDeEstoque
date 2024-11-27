// controllers/fornecedorController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma";
import { Fornecedor } from "../types/interfaces";

export const getFornecedores = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const fornecedores = await prisma.fornecedor.findMany();
    reply.send(fornecedores);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar fornecedores" });
  }
};

export const getFornecedoresPorId = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const fornecedor = await prisma.fornecedor.findUnique({
      where: { id: Number(id) },
    });
    if (!fornecedor) {
      reply.status(404).send({ error: "Fornecedor não encontrado" });
      return;
    }
    reply.send(fornecedor);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar fornecedor" });
  }
}

export const createFornecedor = async (
  request: FastifyRequest<{ Body: Fornecedor }>,
  reply: FastifyReply
) => {
  try {
    const fornecedor = await prisma.fornecedor.create({
      data: request.body,
    });
    reply.status(201).send(fornecedor);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao criar fornecedor" });
  }
};

export const updateFornecedor = async (
  request: FastifyRequest<{ Params: { id: string }; Body: Fornecedor }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const fornecedor = await prisma.fornecedor.update({
      where: { id: Number(id) },
      data: request.body,
    });
    reply.send(fornecedor);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao atualizar fornecedor" });
  }
};

export const deleteFornecedor = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    await prisma.fornecedor.delete({
      where: { id: Number(id) },
    });
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send({ error: "Erro ao deletar fornecedor" });
  }
};
