import { Router } from "express";

export const signinRouter = Router();

signinRouter.post("/api/v1/signin", (req, res) => {
  res.json({ msg: "signin router" });
});
