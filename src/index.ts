import bitbar, { BitbarOptions } from "bitbar";
import groupBy from "lodash/groupBy";
import fetch from "node-fetch";

const { JIRA_BASE_URL, JIRA_USER_NAME, JIRA_API_KEY, JIRA_JQL } = process.env;

async function main() {
  if (
    [JIRA_BASE_URL, JIRA_USER_NAME, JIRA_API_KEY].filter((value) => !!value)
      .length < 3
  ) {
    bitbar([
      { text: "Jira Error", color: "white", dropdown: false },
      bitbar.separator,
      "Error: Base URL, Username, and API Key all need to be set in xbar",
    ]);
    return;
  }
  const Authorization = `Basic ${Buffer.from(
    `${JIRA_USER_NAME}:${JIRA_API_KEY}`
  ).toString("base64")}`;

  let error;
  const [fields, { issues }] = await Promise.all([
    fetch(`https://${JIRA_BASE_URL}/rest/api/3/field`, {
      headers: { Authorization },
    }).then((response) => response.json()),
    fetch(
      `https://${JIRA_BASE_URL}/rest/api/3/search?jql=${encodeURIComponent(
        JIRA_JQL
      )}`,
      { headers: { Authorization } }
    ).then((response) => response.json()),
  ]).catch((e) => {
    error = e.message;
    return [];
  });

  const groupedIssues = groupBy(
    issues,
    (issue) => issue.fields.status.name
  );

  if (error) {
    bitbar([
      {
        text: "Jira Error",
        color: "white",
        dropdown: false,
      },
      bitbar.separator,
      { text: `Error: ${error}` },
    ]);
  } else {
    bitbar([
      {
        text: `Jira: ${issues.length} Issues`,
        color: "white",
        dropdown: false,
      },
      bitbar.separator,
      ...Object.keys(groupedIssues).reduce(
        (result, groupKey): BitbarOptions[] => {
          const group = groupedIssues[groupKey];
          return [
            ...result,
            {
              text: groupKey,
            },
            ...group.map(({ key, fields }: any) => ({
              text: `   ${key}: ${fields.summary}`,
              href: `https:${JIRA_BASE_URL}/browse/${key}`,
            })),
          ];
        },
        []
      ),
    ]);
  }
}

try {
  main();
} catch (e) {
  console.error(e.message);
}
