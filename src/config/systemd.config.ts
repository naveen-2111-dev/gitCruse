import { execSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

export async function setupSystemd() {
  const serviceName = "gitcruse";
  const projectDir = process.cwd();
  const nodePath = process.execPath;

  const testCli = path.join(projectDir, "index.ts");
  const cliPath = "/usr/local/bin/gitcruse";

  const isDev = fs.existsSync(testCli);

  const serviceFile = `
[Unit]
Description=GitCruse - Auto-Commit & DB Sync
After=network.target

[Service]
Type=simple
User=${os.userInfo().username}
WorkingDirectory=${projectDir}
ExecStart=${nodePath} ${isDev ? testCli : cliPath} init
Restart=always
RestartSec=10
Environment="NODE_ENV=${isDev ? "development" : "production"}"

[Install]
WantedBy=multi-user.target
  `.trim();

  try {
    fs.writeFileSync(`/etc/systemd/system/${serviceName}.service`, serviceFile);
    console.log("Created systemd service file");
  } catch (err) {
    console.error("Failed to write service file (try with sudo):", err);
    return;
  }

  try {
    execSync("sudo systemctl daemon-reload");
    execSync(`sudo systemctl enable ${serviceName}`);
    execSync(`sudo systemctl start ${serviceName}`);
    console.log("🚀 GitCruse daemon is now running!");
    console.log("📋 Commands:");
    console.log(`- Stop: sudo systemctl stop ${serviceName}`);
    console.log(`- Logs: journalctl -u ${serviceName} -f`);
  } catch (err) {
    console.error("Failed to enable service:", err);
  }
}

setupSystemd();
