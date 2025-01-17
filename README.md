# GitHub Repository Self-Approve Action

> A GitHub Action to automatically approve your own pull request for a protected branch using a GitHub App.

## Usage

```yaml
name: Self-Approve Action

on:
  pull_request:

jobs:
  self-approve-action:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Self-Approve Action
        uses: nicklegan/github-repo-self-approve-action@v1.0.1
        if: github.actor == 'your-username'
        with:
          appid: ${{ secrets.APPID }}
          privatekey: ${{ secrets.PRIVATEKEY }}
          installationid: ${{ secrets.INSTALLATIONID }}
```

## GitHub App

[Register](https://docs.github.com/developers/apps/building-github-apps/creating-a-github-app) a new organization or personal owned GitHub App with the below permissions:

| GitHub App Permission                  | Access         |
| :------------------------------------- | :------------- |
| `Repository Permissions:Contents`      | read and write |
| `Repository Permissions:Pull requests` | read and write |

After registration install the GitHub App to your organization. Store the below App values as secrets.

## GitHub secrets

| Name             | Value                             | Required |
| :--------------- | :-------------------------------- | :------- |
| `APPID`          | GitHub App ID number              | `true`   |
| `PRIVATEKEY`     | Content of private key .pem file  | `true`   |
| `INSTALLATIONID` | GitHub App installation ID number | `true`   |

Finally set your GitHub username as the `github.actor` conditional value within the workflow file.

:bulb: The GitHub App name will be used as the name for the approving reviewer.

## Action inputs

| Name           | Description                                         | Default | Options        | Required |
| :------------- | :-------------------------------------------------- | :------ | :------------- | :------- |
| `github.actor` | Approve pull requests created by the user specified |         | [workflow.yml] | `false`  |

[workflow.yml]: #Usage 'Usage'
