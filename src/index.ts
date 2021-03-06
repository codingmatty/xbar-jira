import bitbar, { BitbarOptions } from "bitbar";
import { fetch } from "./fetch";
import { groupBy } from "./groupBy";
import { fetchFields, fetchIssues } from "./jira";

import type { Field, Issue, IssuesResponse } from "./types";

const {
  JIRA_BASE_URL,
  JIRA_USER_NAME,
  JIRA_API_KEY,
  JIRA_GROUPBY_FIELD,
  JIRA_GROUPBY_CUSTOM_FIELD,
} = process.env;

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

  let error;
  const [fields, { issues }]: [Field[], IssuesResponse] = await Promise.all([
    fetchFields(),
    fetchIssues(),
  ]).catch((e) => {
    error = e.message;
    return [[], { issues: [] }];
  });

  let groupedByKey = JIRA_GROUPBY_FIELD;
  let groupedByLabel = JIRA_GROUPBY_FIELD;
  if (JIRA_GROUPBY_FIELD === "custom") {
    const customField = fields.find(
      ({ name }) =>
        name.toLowerCase() === JIRA_GROUPBY_CUSTOM_FIELD?.toLowerCase()
    );
    groupedByKey = customField?.key;
    groupedByLabel = customField?.name;
  }

  const sprintField = fields.find(
    ({ name }) => name.toLowerCase() === "sprint"
  );
  // If a sprint field exists, attempt to filter issues from the active sprint
  const issuesInActiveSprint = sprintField
    ? issues.filter((issue: any) =>
        issue.fields[sprintField.key]?.some(
          ({ state }: any) => state === "active"
        )
      )
    : issues;

  const groupedIssues = groupBy(
    issuesInActiveSprint,
    (issue) => issue.fields[groupedByKey]?.name
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
      `Grouped By: ${groupedByLabel ?? "No Valid Grouping Applied"}`,
      bitbar.separator,
      ...Object.keys(groupedIssues).reduce(
        (result, groupKey, i, array): BitbarOptions[] => {
          const group = groupedIssues[groupKey];
          return [
            ...result,
            array.length === 1 && groupKey === "undefined"
              ? null
              : { text: groupKey },
            ...group.map(({ key, fields }: any) => ({
              text: `???\t${key}: ${fields.summary}`,
              href: `https:${JIRA_BASE_URL}/browse/${key}`,
            })),
          ].filter(Boolean);
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
