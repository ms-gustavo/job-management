import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const updateJobStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: `Método inválido!` });
  }
  const { jobId, updatedStatus } = req.body;
  try {
    const job = await prisma.job.update({
      where: { id: jobId },
      data: { status: updatedStatus },
    });

    res.status(200).json({ job });
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    res.status(400).json({ error: `${error.message}` });
  }
};

export default updateJobStatus;
