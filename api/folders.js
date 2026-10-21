import express from "express";
import { getFolders, getFoldersByID } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  const folder = await getFoldersByID(id);
  if (!folder) return res.status(404).send("Folder not found.");
  req.folder = folder;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.folder);
});

router.post("/:id/files", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required");

  const { name, size } = req.body;
  if (!name || !size) {
    return res.status(400).send("Request body requires: name, size");
  }

  const file = await createFile({ name, size, folderId: req.folder.id });
  res.status(201).send(file);
});
