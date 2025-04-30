import fs from "fs-extra";
import path from "path";
import yaml from "js-yaml";
import notifier from "node-notifier";

class Workflow {
  constructor(name, steps) {
    this.name = name;
    this.steps = steps;
  }

  async run() {
    for (const step of this.steps) {
      if (step.run) {
        console.log(`→ Step: ${step.name || "Unnamed"} | Command: ${step.run}`);
        try {
          const { exec } = await import("child_process");
          const success = await new Promise((resolve, reject) => {
            exec(step.run, (error, stdout, stderr) => {
              if (error) {
                console.error(`Error in step "${step.name}": ${error.message}`);
                reject(false);
              } else {
                if (stdout) console.log(stdout);
                if (stderr) console.error(stderr);
                resolve(true);
              }
            });
          });
          if (!success) {
            console.log(`Build failed at step: ${step.name}`);
            return false;
          }
        } catch (err) {
          console.error(`Step failed: ${err.message}`);
          return false;
        }
      } else if (step.uses) {
        console.warn(`Skipped: '${step.name}' — uses '${step.uses}'`);
      } else {
        console.warn(`Unknown step format:`, step);
      }
    }
    return true;
  }
}

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
        "Workflow missing! Set up using `gitcruse init` or place cruse.yml under .gitcruse/cruseFlows/";
      console.error(" cruse.yml not found at:", ymlPath);

      notifier.notify({
        title: "GitCruse ⚙️ Missing Workflow",
        message,
        sound: true,
      });

      return [];
    }

    const dataYml = fs.readFileSync(ymlPath, "utf-8");
    const parsed = yaml.load(dataYml);

    const workflows = [];
    console.log(workflows);

    if (parsed.jobs) {
      for (const [jobName, jobData] of Object.entries(parsed.jobs)) {
        workflows.push(new Workflow(jobName, jobData.steps || []));
      }
    } else {
      console.warn(" No jobs found in YAML.");
    }

    return workflows;
  } catch (error) {
    console.error(" Error reading or parsing cruse.yml:", error);
    return [];
  }
}

export { GetBuildWorkflows };
