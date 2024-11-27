// controllers/clienteController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../prisma";
import { Cliente } from "../types/interfaces";

export const getClientes = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const clientes = await prisma.cliente.findMany();
    reply.send(clientes);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar clientes" });
  }
};

export const getClientePorId = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(request.params.id) },
    });
    if (!cliente) {
      reply.status(404).send({ error: "Cliente não encontrado" });
      return;
    }
    reply.send(cliente);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao buscar cliente" });
  }
};

export const createCliente = async (
  request: FastifyRequest<{ Body: Cliente }>,
  reply: FastifyReply
) => {
  try {
    const cliente = await prisma.cliente.create({
      data: request.body,
    });
    reply.status(201).send(cliente);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao criar cliente" });
  }
};

export const updateCliente = async (
  request: FastifyRequest<{ Params: { id: string }; Body: Cliente }>,
  reply: FastifyReply
) => {
  try {
    const cliente = await prisma.cliente.update({
      where: { id: Number(request.params.id) },
      data: request.body,
    });
    reply.send(cliente);
  } catch (error) {
    reply.status(500).send({ error: "Erro ao atualizar cliente" });
  }
};

export const deleteCliente = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    await prisma.cliente.delete({
      where: { id: Number(request.params.id) },
    });
    reply.send({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    reply.status(500).send({ error: "Erro ao deletar cliente" });
  }
};