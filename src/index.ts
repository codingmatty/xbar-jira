import bitbar from "bitbar";
import fetch from "node-fetch";

const { JIRA_BASE_URL, JIRA_USER_NAME, JIRA_API_KEY } = process.env;

(async function () {
  const Authorization = `Basic ${Buffer.from(
    `${JIRA_USER_NAME}:${JIRA_API_KEY}`
  ).toString("base64")}`;

  let error;
  const [fields, issues] = await Promise.all([
    fetch(`https://${JIRA_BASE_URL}/rest/api/3/field`, {
      headers: { Authorization },
    }).then((response) => response.json()),
    fetch(
      `https://${JIRA_BASE_URL}/rest/api/3/search?jql=assignee%20in%20(currentUser())`,
      { headers: { Authorization } }
    ).then((response) => response.json()),
  ]).catch((e) => {
    error = e.message;
    return [];
  });

  if (error) {
    bitbar([
      {
        text: "Jira",
        color: "white",
        dropdown: false,
      },
      bitbar.separator,
      { text: "Error" },
    ]);
  } else {
    bitbar([
      {
        text: "Jira",
        color: "white",
        dropdown: false,
      },
      bitbar.separator,
      ...issues.map(({ key, self }: any) => ({ text: key, href: self })),
    ]);
  }
})();
