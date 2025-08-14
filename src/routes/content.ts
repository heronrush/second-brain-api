import { Router } from "express";
import { PrismaClient } from "../generated/prisma";
import { verifyToken } from "../middleware/auth";

export const contentRouter = Router();

const prisma = new PrismaClient();

contentRouter.use(verifyToken);

contentRouter.post("/api/v1/content", async (req, res) => {
  const { title, description, link, type, userId } = req.body;

  const newContent = await prisma.content.create({
    data: {
      title: title,
      description: description,
      link: link,
      type: type,
      userId: userId,
    },
  });

  res.json({ msg: "new content added" });
});

// Fetching all existing documents for a single authenticated user (no pagination)
contentRouter.get("/api/v1/content", async (req, res) => {
  const { userId } = req.body;

  const getAllContents = await prisma.content.findMany({
    where: {
      userId: userId,
    },
  });

  if (getAllContents.length > 0) {
    res.json({ content: getAllContents });
  } else {
    res.json({
      msg: "user has not added any contents yet",
      content: getAllContents,
    });
  }
});

// delete a content
contentRouter.delete("/api/v1/content", (req, res) => {
  res.json({ msg: "deletes a content" });
});
