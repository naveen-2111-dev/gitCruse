import { GetChangedFiles } from "../utils/filechanges";
import { Reader } from "./reader";

async function Qa() {
  try {
    const changedFiles = await GetChangedFiles();

    if (changedFiles) {
      new Reader(changedFiles);
    } else {
      console.log("No changed files found.");
    }
  } catch (error) {
    console.log(error);
  }
}

Qa();
