import fs from "fs-extra";

interface ChangedFiles {
  modifiedFiles?: string[];
  createdFiles?: string[];
  untrackedFiles?: string[];
}

export class Reader {
  private changedFiles?: ChangedFiles;

  constructor(changedFiles?: ChangedFiles) {
    this.changedFiles = changedFiles;
    this.processAll();
  }

  private processAll() {
    this.processModifiedFiles();
    this.processCreatedFiles();
    this.processUntrackedFiles();
  }

  private processModifiedFiles() {
    this.changedFiles?.modifiedFiles?.forEach((file) => {
      console.log(`Modified file: ${file}`);
      const data = fs.readFileSync(file, "utf8");
      console.log(`Contents of ${file}:`, data);
      return data;
    });
  }

  private processCreatedFiles() {
    this.changedFiles?.createdFiles?.forEach((file) => {
      console.log(`Created file: ${file}`);
      const data = fs.readFileSync(file, "utf8");
      console.log(`Contents of ${file}:`, data);
      return data;
    });
  }

  private processUntrackedFiles() {
    this.changedFiles?.untrackedFiles?.forEach((file) => {
      console.log(`Untracked file: ${file}`);
      const data = fs.readFileSync(file, "utf8");
      console.log(`Contents of ${file}:`, data);
      return data;
    });
  }
}
