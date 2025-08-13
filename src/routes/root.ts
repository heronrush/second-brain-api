import { Router } from "express";
import { signinRouter } from "./signin";
import { shareRouter } from "./share";
import { signupRouter } from "./signup";
import { contentRouter } from "./content";

export const rootRouter = Router();

rootRouter.use(signinRouter);
rootRouter.use(signupRouter);
rootRouter.use(shareRouter);
rootRouter.use(contentRouter);
