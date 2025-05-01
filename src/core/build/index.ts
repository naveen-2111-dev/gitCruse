import { BuildResultTemplate } from "../../templates/buildtemplate/index.js";
import { getPrimaryEmail } from "../../utils/getMail.js";
import { readCruseFile } from "../../utils/getToken.js";
import sendEmail from "../../utils/mailer.js";
import { GetBuildWorkflows } from "./build.js";
import notifier from "node-notifier";

interface CruseFile {
  githubToken: string;
  repo: string;
}

async function BuildProject(): Promise<boolean | void> {
  const workflows = await GetBuildWorkflows();
  const cruse = readCruseFile() as CruseFile | undefined;

  if (!cruse || !cruse.githubToken || !cruse.repo) {
    notifier.notify({
      title: "GitCruse ⚠️ Configuration Error",
      message: "Missing GitHub token or repository name in config file.",
      sound: true,
    });
    return false;
  }

  const mail = await getPrimaryEmail(cruse.githubToken);
  let flowname: string = "";

  if (!workflows || workflows.length === 0) {
    console.log("No workflows found.");
    return;
  }

  for (const workflow of workflows) {
    console.log(`🚀 Running workflow: ${workflow.name}`);
    const success = await workflow.run();
    if (!success) {
      notifier.notify({
        title: "GitCruse ⚙️ Build Failed",
        message: `The workflow "${workflow.name}" failed. Please check the logs for more details.`,
        sound: true,
      });

      flowname = workflow.name;

      if (mail?.email) {
        sendEmail({
          template: BuildResultTemplate("failed"),
          subject: `Build failed for ${cruse.repo}`,
          email: mail.email,
        });
      }
      return false;
    }
  }

  notifier.notify({
    title: "GitCruse ⚙️ Build Succeeded",
    message: "All workflows have been completed successfully!",
    sound: true,
  });

  if (mail?.email) {
    sendEmail({
      template: BuildResultTemplate("success"),
      subject: `🎉 Successful build for ${cruse.repo}`,
      email: mail.email,
    });
  }

  return true;
}

BuildProject();
