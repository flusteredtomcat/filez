import express from "express";
import { getAllFiles } from "#db/queries/files";

const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const files = await getAllFiles();
  res.send(files);
});
