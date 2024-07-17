import { NextApiRequest, NextApiResponse } from "next";
import brcypt from "bcryptjs";
import prisma from "@/lib/prisma";

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const hashedPassword = await brcypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      res.status(201).json(user);
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      res.status(400).json({ error: "Email Já existente" });
    }
  } else {
    res.status(405).json({ error: "Método não aceito" });
  }
};

export default registerUser;
