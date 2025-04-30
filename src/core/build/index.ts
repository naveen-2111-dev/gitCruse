import { BuildResultTemplate } from "../../templates/buildtemplate/index.js";
import { getPrimaryEmail } from "../../utils/getMail.js";
import { readCruseFile } from "../../utils/getToken.js";
import sendEmail from "../../utils/mailer.js";
import { GetBuildWorkflows } from "./build.js";
import notifier from "node-notifier";

async function BuildProject() {
  const workflows = await GetBuildWorkflows();
  const cruse = readCruseFile();
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
      console.log("Build failed.");
      notifier.notify({
        title: "GitCruse ⚙️ Build Failed",
        message: `The workflow "${workflow.name}" failed. Please check the logs for more details.`,
        sound: true,
      });

      flowname = workflow.name;

      if (mail && mail.email) {
        sendEmail({
          template: BuildResultTemplate("failed", workflow.name),
          subject: `build failed for ${cruse.repo}`,
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

  if (mail && mail.email) {
    sendEmail({
      template: BuildResultTemplate("success", flowname),
      subject: `wooh a successfull build on this ${cruse.repo}`,
      email: mail.email,
    });
  }
  return true;
}

BuildProject();
