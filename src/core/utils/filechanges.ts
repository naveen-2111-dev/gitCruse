import { git } from "../../utils/git";

async function GetChangedFiles() {
  try {
    const status = await git.status();

    const modifiedFiles = status.modified;
    const createdFiles = status.created;
    const untrackedFiles = status.not_added;

    return { modifiedFiles, createdFiles, untrackedFiles };
  } catch (error) {
    console.error("Error fetching changes:", error);
  }
}

export { GetChangedFiles };
