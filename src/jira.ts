import { fetch } from "./fetch";
import type { Field, IssuesResponse } from "./types";

const { JIRA_BASE_URL, JIRA_USER_NAME, JIRA_API_KEY, JIRA_JQL } = process.env;

export function fetchFields(): Promise<Field[]> {
  const Authorization = `Basic ${Buffer.from(
    `${JIRA_USER_NAME}:${JIRA_API_KEY}`
  ).toString("base64")}`;

  return fetch(`https://${JIRA_BASE_URL}/rest/api/3/field`, {
    headers: { Authorization },
  });
}

export function fetchIssues(): Promise<IssuesResponse> {
  const Authorization = `Basic ${Buffer.from(
    `${JIRA_USER_NAME}:${JIRA_API_KEY}`
  ).toString("base64")}`;

  return fetch(
    `https://${JIRA_BASE_URL}/rest/api/3/search?jql=${encodeURIComponent(
      JIRA_JQL
    )}`,
    { headers: { Authorization } }
  );
}
