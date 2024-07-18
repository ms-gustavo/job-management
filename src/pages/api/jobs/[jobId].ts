import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const deleteJob = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { jobId } = req.query;

  if (!jobId || typeof jobId !== "string") {
    return res.status(400).json({ error: "ID da vaga inválido" });
  }

  try {
    await prisma.job.delete({
      where: { id: jobId },
    });
    res.status(204).end();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Erro ao excluir a vaga" });
  }
};

export default deleteJob;
