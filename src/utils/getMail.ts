import { Octokit } from "@octokit/rest";

async function getPrimaryEmail(token: string) {
  const octokit = new Octokit({
    auth: token,
  });
  try {
    const { data } = await octokit.request("GET /user/emails");

    const primaryEmail = data.find(
      (item) =>
        item.primary &&
        item.verified &&
        !item.email.includes("noreply.github.com")
    );

    if (primaryEmail) {
      return primaryEmail;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getPrimaryEmail };
