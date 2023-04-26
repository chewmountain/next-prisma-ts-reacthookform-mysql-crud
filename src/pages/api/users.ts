import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { login, password } = req.body;

    try {
      await prisma.user.create({
        data: {
          login,
          password,
        },
      });

      res.status(200).json("New user");
    } catch (e) {
      console.error(e);
    }
  } else {
    const users = await prisma.user.findMany();
    res.json(users);
  }
}
