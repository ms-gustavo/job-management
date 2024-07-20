import { NextApiRequest, NextApiResponse } from "next";
import brcypt from "bcryptjs";
import prisma from "@/lib/prisma";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SECRET = process.env.TOKEN_SECRET_KEY;

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const hashedPassword = await brcypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      if (!JWT_SECRET) {
        return res.status(500).json({
          error: "Chave secreta não está definida. Reveja o arquivo .env",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        JWT_SECRET
      );

      res.status(201).json({ token });
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      res.status(400).json({ error: "Email Já existente" });
    }
  } else {
    res.status(405).json({ error: "Método não aceito" });
  }
};

export default registerUser;
