import { Router } from "express";

export const shareRouter = Router();

shareRouter.post("/api/v1/brain/share", (req, res) => {
  res.json({ msg: "share content router" });
});

// fetch another user's shared brain content
shareRouter.get("/api/v1/brain/:shareLink", (req, res) => {
  res.json({ msg: "get another user's brain" });
});
