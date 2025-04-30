import * as fs from "fs";
import * as path from "path";

interface CruseConfig {
  githubToken: string;
  username: string;
  repo: string;
  commitInterval: number;
  confirmPush: boolean;
  automationLevel: string;
}

function readCruseFile(): CruseConfig | undefined {
  const filePath = path.resolve(process.cwd(), ".cruse");

  if (!fs.existsSync(filePath)) {
    return;
  }

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const json_data: CruseConfig = JSON.parse(data);

    return json_data;
  } catch (error) {
    console.error("Error reading .cruse file:", error);
  }
}

export { readCruseFile };
