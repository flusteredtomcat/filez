import db from "#db/client";
import { createFolder } from "./queries/folder.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folderNames = ["documents", "pictures", "music"];
  for (const folderName of folderNames) {
    const folder = await createFolder(folderName);
    for (let i = 1; i <= 5; i++) {
      await createFile({
        name: `${folderName}-file-${i}.txt`,
        size: i * 1000,
        folderId: folder.id,
      });
    }
  }
}
