import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const registerNewJob = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Método inválido!` });
  }

  const { userId, title, company, status, appliedAt, site } = req.body;

  try {
    const job = await prisma.job.create({
      data: {
        title,
        company,
        status,
        appliedAt: new Date(appliedAt),
        site,
        userId,
      },
    });

    res.status(201).json({ job });
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    res.status(400).json({ error: `${error.message}` });
  }
};

export default registerNewJob;
