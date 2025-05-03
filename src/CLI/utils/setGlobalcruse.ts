import os from "os";
import path from "path";
import fs from "fs-extra";

interface GlobalCruseConfig {
  github: {
    pat: string;
    defaultBranch: string;
  };
  ai: {
    gemini: {
      apiKey: string;
      safetyCheck: boolean;
    };
  };
  projects: Record<
    string,
    {
      lastUpdated: string;
      isActive?: boolean;
    }
  >;
}

async function setupGlobalCruse(projectPath: string): Promise<string> {
  const globalCruseDir = path.join(os.homedir(), "theCrusior", "global_cruse");
  const globalCruseFile = path.join(globalCruseDir, "cruse.enc");

  await fs.ensureDir(globalCruseDir);

  let config: GlobalCruseConfig;
  if (await fs.pathExists(globalCruseFile)) {
    config = await fs.readJSON(globalCruseFile);
  } else {
    config = {
      github: {
        pat: "",
        defaultBranch: "main",
      },
      ai: {
        gemini: {
          apiKey: "",
          safetyCheck: true,
        },
      },
      projects: {},
    };
  }

  config.projects[projectPath] = {
    lastUpdated: new Date().toISOString(),
    isActive: true,
  };

  await fs.writeJSON(globalCruseFile, config, { spaces: 2 });
  return globalCruseFile;
}

export { setupGlobalCruse as default, GlobalCruseConfig };
