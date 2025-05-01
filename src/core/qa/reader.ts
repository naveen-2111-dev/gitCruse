import fs from "fs-extra";

interface ChangedFiles {
  modifiedFiles?: string[];
  createdFiles?: string[];
  untrackedFiles?: string[];
}

export class Reader {
  private changedFiles?: ChangedFiles;
  private fileContents: Record<string, string> = {};

  constructor(changedFiles?: ChangedFiles) {
    this.changedFiles = changedFiles;
    this.processAll();
  }

  private async processAll() {
    await this.processModifiedFiles();
    await this.processCreatedFiles();
    await this.processUntrackedFiles();
  }

  private async processModifiedFiles() {
    for (const file of this.changedFiles?.modifiedFiles || []) {
      try {
        console.log(`Modified file: ${file}`);
        const data = await fs.readFile(file, "utf8");
        console.log(`Contents of ${file}:`, data);
        this.fileContents[`modified-${file}`] = data;
      } catch (error) {
        console.error(`Error reading modified file ${file}:`, error);
      }
    }
  }

  private async processCreatedFiles() {
    for (const file of this.changedFiles?.createdFiles || []) {
      try {
        console.log(`Created file: ${file}`);
        const data = await fs.readFile(file, "utf8");
        console.log(`Contents of ${file}:`, data);
        this.fileContents[`createdfiles-${file}`] = data;
      } catch (error) {
        console.error(`Error reading created file ${file}:`, error);
      }
    }
  }

  private async processUntrackedFiles() {
    for (const file of this.changedFiles?.untrackedFiles || []) {
      try {
        console.log(`Untracked file: ${file}`);
        const data = await fs.readFile(file, "utf8");
        console.log(`Contents of ${file}:`, data);
        this.fileContents[`untrackedfiles-${file}`] = data;
      } catch (error) {
        console.error(`Error reading untracked file ${file}:`, error);
      }
    }
  }

  public getFileContents(): Record<string, string> {
    return this.fileContents;
  }
}
