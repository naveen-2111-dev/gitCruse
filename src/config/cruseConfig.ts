import fs from "fs-extra";
import path from "path";

export default async function CruseIgnore() {
  try {
    const gitignorePath = path.resolve(process.cwd(), ".gitignore");

    if (!(await fs.pathExists(gitignorePath))) {
      await fs.writeFile(gitignorePath, ".cruse\n");
      console.log(".gitignore created and .cruse added.");
      return;
    }

    const content = await fs.readFile(gitignorePath, "utf-8");

    if (!content.includes(".cruse")) {
      await fs.appendFile(gitignorePath, "\n.cruse\n");
    } else {
      return;
    }
  } catch (err) {
    console.error("Error updating .gitignore:", err);
  }
}
