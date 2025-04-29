import fs from "fs-extra";
import path from "path";
import notifier from "node-notifier";

async function GetBuildWorkflows() {
  try {
    const projectRoot = process.cwd();

    const ymlPath = path.join(  
      projectRoot,
      ".gitcruse",
      "cruseFlows",
      "cruse.yml"
    );

    if (!fs.existsSync(ymlPath)) {
      const message =
        "Workflow missing! Set up using `gitcruse init` or place cruse.yml under .gitcruse/cruseFlows/. " +
        "This ensures automation safety & production stability.";

      console.error("cruse.yml not found at:", ymlPath);
      console.warn(message);

      notifier.notify({
        title: "GitCruse ⚙️ Missing Workflow",
        message,
        sound: true,
      });

      return;
    }

    const dataYml = fs.readFileSync(ymlPath, "utf-8");
    console.log("cruse.yml content:\n", dataYml);
  } catch (error) {
    console.log("Error reading cruse.yml:", error);
  }
}

export { GetBuildWorkflows };
