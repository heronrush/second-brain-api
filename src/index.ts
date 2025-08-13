import express from "express";
import { rootRouter } from "./routes/root";

const app = express();

app.use(rootRouter);

app.get("/", (req, res) => {
  res.json({ msg: "hello wrld" });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
