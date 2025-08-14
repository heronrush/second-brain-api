import express, { NextFunction, Request, Response } from "express";
import { rootRouter } from "./routes/root";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use(rootRouter);

app.get("/", (req, res) => {
  res.json({ msg: "second brain" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // set the status code

  res.status(500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
