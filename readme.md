# xbar Jira Plugin
---

**Important Note**: Due to a limitation in the default variable parsing, you'll need to set the JQL to filter by your user after installing. See [this issue](https://github.com/matryer/xbar/issues/720) on progress for a fix.

---

This is a plugin that allows you to keep your Jira tasks from the currently active sprint in your menu bar.

There are also options to customize the JQL used to pull issues in, and to group issues by a particular field, including custom fields.

---

## Development

### Steps

1. `npm install` to install dependencies
1. `npm run dev:prepare` to setup an executable symlink in your `xbar` plugins directory
1. `npm run dev` to watch the src code and automatically generate the executable script linked by `xbar`

