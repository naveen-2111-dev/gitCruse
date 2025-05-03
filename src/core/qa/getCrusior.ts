import os from "os";
import path from "path";
import fs from "fs-extra";
import notifier from "node-notifier";
import { CronJob } from "cron";
import { readCruseFile } from "../../utils/getToken";
import { getPrimaryEmail } from "../../utils/getMail";
import sendEmail from "../../utils/mailer";

async function getCrusior() {
  try {
    const configPath = path.join(os.homedir(), "theCrusior", "gitcruse.enc");

    const keyExists = await fs.pathExists(configPath);
    const token = readCruseFile();

    if (!token || !token.githubToken) {
      notifier.notify({
        title: "GitHub Token Missing",
        message: "Please set your GitHub token",
        sound: true,
      });

      return null;
    }

    const mail = await getPrimaryEmail(token.githubToken);
    if (!keyExists) {
      const job = new CronJob("0 9 * * *", () => {
        notifier.notify({
          title: "Reminder",
          message:
            "Your Gemini API key is still not set. Please set it using: your-cli-tool set-key, set it asap so that actions can perform better",
          sound: true,
        });

        if (mail) {
          sendEmail({
            template: "",
            subject: "Gemini API Key Reminder",
            email: mail.email,
          });
        }
      });

      job.start();

      return null;
    }

    const encryptedKey = await fs.readFile(configPath, "utf8");
    return encryptedKey;
  } catch (error) {
    notifier.notify({
      title: "GitCruse Error",
      message: `Something went wrong while loading your key. ${error}`,
    });

    return null;
  }
}

export { getCrusior };
