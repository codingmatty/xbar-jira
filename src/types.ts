export type Field = {
  id: string;
  key: string;
  name: string;
  untranslatedName: string;
  custom: boolean;
  orderable: boolean;
  navigable: boolean;
  searchable: boolean;
  clauseNames: string[];
  schema: {
    type: string;
    custom: string;
    customId: number;
  };
};

export type AvatarUrls = {
  "48x48": string;
  "24x24": string;
  "16x16": string;
  "32x32": string;
};

export type UserInfo = {
  self: string;
  accountId: string;
  emailAddress: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
};

export type Issue = {
  id: string;
  self: string;
  key: string;
  fields: {
    summary: string;
    labels: string[];
    components: {
      self: string;
      id: string;
      name: string;
    }[];
    issuetype: {
      self: string;
      id: string;
      name: string;
      description: string;
      iconUrl: string;
      subtask: boolean;
      avatarId: number;
      entityId: string;
      hierarchyLevel: number;
    };
    project: {
      self: string;
      id: string;
      key: string;
      name: string;
      projectTypeKey: string;
      simplified: boolean;
      avatarUrls: AvatarUrls;
    };
    resolution: {
      self: string;
      id: string;
      description: string;
      name: string;
    };
    priority: {
      self: string;
      iconUrl: string;
      name: string;
      id: string;
    };
    assignee: UserInfo;
    status: {
      self: string;
      description: string;
      iconUrl: string;
      name: string;
      id: string;
      statusCategory: {
        self: string;
        id: number;
        key: string;
        colorName: string;
        name: string;
      };
    };
    creator: UserInfo;
    reporter: UserInfo;
    [key: string]: any;
  };
};

export type IssuesResponse = { issues: Issue[] };
