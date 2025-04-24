import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import CruseIgnore from "../../../config/cruseConfig";

const Init = new Command("init")
  .description("initialize .cruse")
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "githubToken",
          message: "Enter your GitHub Access Token:",
          validate: (input: string) =>
            input ? true : "GitHub token is required",
        },
        {
          type: "input",
          name: "username",
          message: "Enter your GitHub Username:",
          validate: (input: string) =>
            input ? true : "GitHub username is required",
        },
        {
          type: "input",
          name: "repo",
          message: "Enter the GitHub Repository Name:",
          validate: (input: string) =>
            input ? true : "Repository name is required",
        },
        {
          type: "input",
          name: "commitInterval",
          message: "Enter the commit interval in minutes (e.g., 10, 30, 60):",
          validate: (input: string) =>
            !isNaN(Number(input)) && Number(input) > 0
              ? true
              : "Please enter a valid number",
        },
        {
          type: "confirm",
          name: "confirmPush",
          message: "Would you like to enable automatic pushing of commits?",
          default: true,
        },
      ]);

      const cruseConfig = {
        githubToken: answers.githubToken,
        username: answers.username,
        repo: answers.repo,
        commitInterval: answers.commitInterval,
        confirmPush: answers.confirmPush,
      };

      const cruseFilePath = path.resolve(process.cwd(), ".cruse");

      await fs.writeJson(cruseFilePath, cruseConfig, { spaces: 2 });
      await CruseIgnore();

      const gitignorePath = path.resolve(process.cwd(), ".gitignore");
      const gitignoreContent = await fs.readFile(gitignorePath, "utf-8");
      if (!gitignoreContent.includes(".cruse")) {
        await fs.appendFile(gitignorePath, "\n.cruse\n");
      }
    } catch (error) {
      console.error("Error initializing .cruse file:", error);
    }
  });

export { Init };
