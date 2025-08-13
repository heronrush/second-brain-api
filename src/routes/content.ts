import { Router } from "express";

export const contentRouter = Router();

contentRouter.post("/api/v1/content", (req, res) => {
  res.json({ msg: "content router" });
});

// Fetching all existing documents (no pagination)
contentRouter.get("/api/v1/content", (req, res) => {
  res.json({ msg: "fetchs all exisiting content" });
});

// delete a content
contentRouter.delete("/api/v1/content", (req, res) => {
  res.json({ msg: "deletes a content" });
});
