import { Command } from "commander";
import inquirer, { DistinctQuestion } from "inquirer";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import figlet from "figlet";
import CruseIgnore from "../../../config/cruseConfig";

interface CruseAnswers {
  automationLevel: "full" | "partial";
  githubToken: string;
  username: string;
  repo: string;
  commitInterval?: number;
  confirmPush?: boolean;
  confirmSetup: boolean;
}

const Init = new Command("init")
  .description("initialize .cruse")
  .action(async () => {
    try {
      console.log(figlet.textSync("GitCruse", { horizontalLayout: "full" }));
      console.log("\n  Automated your Git Commits with gitcruse\n");

      const spinner = ora("Initializing configuration...").start();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      spinner.stop();

      const questions: DistinctQuestion<CruseAnswers>[] = [
        {
          type: "list",
          name: "automationLevel",
          message: "Select automation level:",
          choices: [
            {
              name: "Fully Automated - add, commit, push, merge",
              value: "full",
            },
            {
              name: "Partly Automated - push, merge",
              value: "partial",
            },
          ],
          pageSize: 2,
        },
        {
          type: "password",
          name: "githubToken",
          message: "Enter your GitHub Access Token:",
          mask: "*",
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
          type: "number",
          name: "commitInterval",
          message: "Commit interval in minutes (e.g., 10, 30, 60):",
          validate: (input: number | undefined) => {
            if (input === undefined || isNaN(input)) {
              return "Please enter a valid number";
            }
            return input > 0 || "Please enter a positive number";
          },
          default: 30,
          when: (answers) => answers.automationLevel === "full",
        },
        {
          type: "confirm",
          name: "confirmPush",
          message: "Enable automatic pushing of commits?",
          default: true,
          when: (answers) => answers.automationLevel === "full",
        },
        {
          type: "confirm",
          name: "confirmSetup",
          message: "Review your settings. Does this look correct?",
          default: true,
        },
      ];

      const answers = await inquirer.prompt<CruseAnswers>(questions);

      if (!answers.confirmSetup) {
        console.log("\nSetup cancelled. No changes were made.");
        return;
      }

      const cruseConfig = {
        githubToken: answers.githubToken,
        username: answers.username,
        repo: answers.repo,
        commitInterval:
          answers.automationLevel === "full"
            ? answers.commitInterval
            : undefined,
        confirmPush:
          answers.automationLevel === "full" ? answers.confirmPush : undefined,
        automationLevel: answers.automationLevel,
      };

      const cruseFilePath = path.resolve(process.cwd(), ".cruse");

      const savingSpinner = ora("Saving configuration...").start();
      await fs.writeJson(cruseFilePath, cruseConfig, { spaces: 2 });
      await CruseIgnore();

      const gitignorePath = path.resolve(process.cwd(), ".gitignore");
      if (await fs.pathExists(gitignorePath)) {
        const gitignoreContent = await fs.readFile(gitignorePath, "utf-8");
        if (!gitignoreContent.includes(".cruse")) {
          await fs.appendFile(gitignorePath, "\n.cruse\n");
        }
      }

      savingSpinner.succeed("Configuration saved successfully!");
    } catch (error) {
      console.error("\nError initializing .cruse file:", error);
    }
  });

export { Init };
