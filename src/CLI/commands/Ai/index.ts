import { Command } from "commander";
import inquirer from "inquirer";
import os from "os";
import path from "path";
import fs from "fs-extra";

const AI = new Command("set-key");

AI.description("setting up the API key for Gemini").action(async (options) => {
  let apiKey = options.apiKey;

  if (!apiKey) {
    const answers = await inquirer.prompt([
      {
        type: "password",
        name: "apiKey",
        message: "Enter your Gemini API key:",
        mask: "*",
        validate: (input) => (input ? true : "API key is required."),
      },
    ]);
    apiKey = answers.apiKey;
  }

  const configDir = path.join(os.homedir(), "theCrusior");
  const configPath = path.join(configDir, "gitcruse.enc");

  await fs.ensureDir(configDir);
  await fs.writeJson(configPath, { apiKey }, { spaces: 2 });
});

export default AI;
