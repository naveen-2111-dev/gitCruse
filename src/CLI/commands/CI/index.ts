import { Command } from "commander";
import fs from "fs-extra";
import path from "path";

const CI = new Command("CI")
  .description("setup workflow boilerplate")
  .action(async () => {
    try {
      const targetDir = process.cwd();

      const gitcruseDir = path.join(targetDir, ".gitcruse");
      await fs.ensureDir(gitcruseDir);

      const cruseFlowsDir = path.join(gitcruseDir, "cruseFlows");
      await fs.ensureDir(cruseFlowsDir);

      const cruseYmlPath = path.join(cruseFlowsDir, "cruse.yml");
      const ymlContent = `# Paste your CI/CD workflow logic here
# Example structure:
#
# version: 1.0
# workflows:
#   build:
#     steps:
#       - name: Install dependencies
#         command: npm install
#
# Customize this file to define your automation workflows
`;
      await fs.writeFile(cruseYmlPath, ymlContent);
      console.log(`
      Cruse flow setup successfull: 
      .gitcruse/
      └── cruseFlows/
          └── cruse.yml
      `);
    } catch (error) {
      console.error("Error setting up folder structure:", error);
    }
  });

export { CI };
