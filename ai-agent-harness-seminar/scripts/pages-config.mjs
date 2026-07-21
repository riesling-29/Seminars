import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const seminarSlug = 'ai-agent-harness-seminar'
export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const repositoryRoot = path.resolve(projectRoot, '..')
export const stagingRoot = path.join(repositoryRoot, '_pages')

function readOriginRemote() {
  return execFileSync('git', ['remote', 'get-url', 'origin'], {
    cwd: repositoryRoot,
    encoding: 'utf8',
  }).trim()
}

function parseRemote(remote) {
  const withoutGitSuffix = remote.replace(/\.git$/i, '')

  try {
    const url = new URL(withoutGitSuffix)
    const pathParts = url.pathname.split('/').filter(Boolean)
    return {
      repositoryName: pathParts.at(-1),
      repositoryUrl: url.origin + '/' + pathParts.join('/'),
    }
  } catch {
    const sshMatch = withoutGitSuffix.match(/^git@([^:]+):(.+)$/)
    if (!sshMatch) {
      throw new Error('origin remote에서 GitHub 저장소 이름을 해석할 수 없습니다: ' + remote)
    }

    const pathParts = sshMatch[2].split('/').filter(Boolean)
    return {
      repositoryName: pathParts.at(-1),
      repositoryUrl: 'https://' + sshMatch[1] + '/' + pathParts.join('/'),
    }
  }
}

function validateRepositoryName(repositoryName) {
  if (!repositoryName || !/^[A-Za-z0-9._-]+$/.test(repositoryName)) {
    throw new Error('안전하지 않거나 비어 있는 repository name입니다: ' + repositoryName)
  }
}

export function getPagesConfig() {
  let repositoryName
  let repositoryUrl

  if (process.env.GITHUB_REPOSITORY) {
    const pathParts = process.env.GITHUB_REPOSITORY.split('/').filter(Boolean)
    repositoryName = pathParts.at(-1)
    const serverUrl = process.env.GITHUB_SERVER_URL || 'https://github.com'
    repositoryUrl = serverUrl.replace(/\/$/, '') + '/' + pathParts.join('/')
  } else {
    const parsedRemote = parseRemote(readOriginRemote())
    repositoryName = parsedRemote.repositoryName
    repositoryUrl = parsedRemote.repositoryUrl
  }

  validateRepositoryName(repositoryName)

  const expectedBasePath = '/' + repositoryName + '/' + seminarSlug + '/'
  const basePath = process.env.PAGES_BASE_PATH || expectedBasePath

  if (basePath !== expectedBasePath) {
    throw new Error(
      'Pages base path가 repository/seminar 경로와 일치하지 않습니다. expected='
        + expectedBasePath
        + ', actual='
        + basePath,
    )
  }

  return {
    repositoryName,
    repositoryUrl,
    basePath,
    sitePrefix: '/' + repositoryName + '/',
  }
}
