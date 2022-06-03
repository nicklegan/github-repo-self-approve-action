const core = require('@actions/core')
const github = require('@actions/github')
const { GitHub } = require('@actions/github/lib/utils')
const { createAppAuth } = require('@octokit/auth-app')
const eventPayload = require(process.env.GITHUB_EVENT_PATH)
const { owner, repo } = github.context.repo

const appId = core.getInput('appid', { required: true })
const privateKey = core.getInput('privatekey', { required: true })
const installationId = core.getInput('installationid', { required: true })

const installationOctokit = new GitHub({
  authStrategy: createAppAuth,
  auth: {
    appId,
    privateKey,
    installationId
  }
})

;(async () => {
  try {
    await installationOctokit.rest.pulls.createReview({
      owner,
      repo,
      pull_number: eventPayload.pull_request.number,
      event: 'APPROVE'
    })
  } catch (error) {
    core.setFailed(error.message)
  }
})()
