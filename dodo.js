import simpleGit from "simple-git";

async function autoCommitAndPush() {
  const git = simpleGit();

  try {
    const status = await git.status();

    const hasChanges =
      status.not_added.length > 0 ||
      status.modified.length > 0 ||
      status.created.length > 0 ||
      status.deleted.length > 0;

    if (!hasChanges) {
      console.log("✅ Working directory clean. Nothing to commit.");
      return;
    }

    console.log("📦 Changes found. Committing...");

    await git.add(".");
    await git.commit("🚀 Automated commit by Cruse");

    const branch = status.current || "main"; // fallback to main just in case

    console.log(`🚀 Pushing to branch: ${branch}...`);

    await git.push("origin", branch);
    console.log("✅ Changes pushed to GitHub.");
  } catch (err) {
    console.error("❌ Git operation failed:", err.message || err);
  }
}

autoCommitAndPush();
