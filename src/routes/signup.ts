import { Router } from "express";

export const signupRouter = Router()

signupRouter.post("/api/v1/signup", (req, res) => {
	res.json({msg:"signup router"})
})