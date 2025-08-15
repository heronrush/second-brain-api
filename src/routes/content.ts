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
contentRouter.get("/api/v1/content/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  const getAllContents = await prisma.content.findMany({
    where: {
      userId: userId,
    },
  });

  if (getAllContents.length > 0) {
    res.json({ contents: getAllContents });
  } else {
    res.json({
      msg: "user has not added any contents yet",
      contents: getAllContents,
    });
  }
});

// delete a content
contentRouter.delete("/api/v1/content", async (req, res) => {
  const { contentId, userId } = req.body;

  try {
    const deleteContent = await prisma.content.delete({
      where: {
        id: parseInt(contentId),
        userId: parseInt(userId),
      },
    });
    res.json({ msg: "successfully deleted" });
  } catch (err) {
    res.status(403).json({
      msg: "not deleted because there is no content or you've provided an incorrect content id",
    });
  }
});
