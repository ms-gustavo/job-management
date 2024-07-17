import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.TOKEN_SECRET_KEY;

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
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
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Email ou senha inválidos" });
    }
  } else {
    res.status(405).json({ error: "Método não aceito" });
  }
};

export default loginUser;
