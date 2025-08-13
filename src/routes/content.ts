import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

export const contentRouter = Router();

const prisma = new PrismaClient();

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

// Fetching all existing documents (no pagination)
contentRouter.get("/api/v1/content", (req, res) => {
  res.json({ msg: "fetchs all exisiting content" });
});

// delete a content
contentRouter.delete("/api/v1/content", (req, res) => {
  res.json({ msg: "deletes a content" });
});
