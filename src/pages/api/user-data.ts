import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.TOKEN_SECRET_KEY;

const userDataHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!JWT_SECRET) {
    return res.status(500).json({
      error: "Chave secreta não está definida. Reveja o arquivo .env",
    });
  }
  if (req.method === "GET") {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: `Token não fornecido` });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          jobs: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: `Usuário não encontrado` });
      }

      res.status(200).json({ user });
    } catch (error: any) {
      console.error(`Erro ao verificar token: ${error.message}`);
      res.status(401).json({ error: `Token inválido` });
    }
  } else {
    res.status(405).json({ error: `Método não aceito` });
  }
};

export default userDataHandler;
