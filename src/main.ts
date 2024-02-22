import * as core from '@actions/core'
import * as event from './event'
import * as version from './version'
import * as git from './git'
import * as github from '@actions/github'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token')

    const tag = event.getCreatedTag()

    var releaseUrl = ''

    if (tag && version.isSemVer(tag)) {
      const changeLog = await git.getChangesIntroducedByTag(tag)

      releaseUrl = await github.createReleaseDraft(tag, token, changeLog)
    }

    core.setOutput('release-url', releaseUrl)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
