import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import {
  getPagesConfig,
  projectRoot,
  repositoryRoot,
  seminarSlug,
  stagingRoot,
} from './pages-config.mjs'

function escapeHtmlAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function assertSafeStagingPath() {
  const expected = path.join(repositoryRoot, '_pages')
  if (stagingRoot !== expected || !stagingRoot.startsWith(repositoryRoot + path.sep)) {
    throw new Error('안전하지 않은 staging 경로입니다: ' + stagingRoot)
  }
}

const pages = getPagesConfig()
const seminarOutput = path.join(stagingRoot, seminarSlug)
const landingTemplatePath = path.join(repositoryRoot, '.github', 'pages', 'index.html')
const npmCliPath = process.env.npm_execpath

if (!npmCliPath) {
  throw new Error('이 스크립트는 npm run build:pages로 실행해야 합니다.')
}

assertSafeStagingPath()
await access(landingTemplatePath)
await rm(stagingRoot, { recursive: true, force: true })
await mkdir(seminarOutput, { recursive: true })

const relativeOutput = path.relative(projectRoot, seminarOutput).split(path.sep).join('/')
const buildResult = spawnSync(
  process.execPath,
  [npmCliPath, 'run', 'build', '--', '--base', pages.basePath, '--out', relativeOutput],
  {
    cwd: projectRoot,
    stdio: 'inherit',
  },
)

if (buildResult.error) {
  throw buildResult.error
}
if (buildResult.status !== 0) {
  throw new Error('Slidev Pages build가 종료 코드 ' + buildResult.status + '로 실패했습니다.')
}

const seminarIndexPath = path.join(seminarOutput, 'index.html')
const seminarHtml = await readFile(seminarIndexPath, 'utf8')
const resourceReferences = [
  ...seminarHtml.matchAll(/\b(?:src|href)="([^"]+)"/g),
].map((match) => match[1])

for (const reference of resourceReferences) {
  if (/^https?:\/\//i.test(reference)) {
    throw new Error('외부 runtime asset URL이 Pages build에 남았습니다: ' + reference)
  }

  if (!reference.startsWith('/')) {
    continue
  }

  const resourcePath = new URL(reference, 'https://pages.invalid').pathname
  if (!resourcePath.startsWith(pages.basePath)) {
    throw new Error('Base Path 밖의 resource URL입니다: ' + reference)
  }

  const relativeResourcePath = resourcePath.slice(pages.basePath.length)
  await access(path.join(seminarOutput, ...relativeResourcePath.split('/')))
}

const template = await readFile(landingTemplatePath, 'utf8')
const landingHtml = template.replaceAll(
  '__REPOSITORY_URL__',
  escapeHtmlAttribute(pages.repositoryUrl),
)

if (landingHtml.includes('__REPOSITORY_URL__')) {
  throw new Error('Landing Page repository URL 치환이 완료되지 않았습니다.')
}
if (!landingHtml.includes('href="./ai-agent-harness-seminar/"')) {
  throw new Error('Landing Page의 상대 Seminar 링크가 없습니다.')
}

await writeFile(path.join(stagingRoot, 'index.html'), landingHtml, 'utf8')
await access(path.join(stagingRoot, 'index.html'))
await access(seminarIndexPath)

console.log('Pages staging 생성: ' + stagingRoot)
console.log('검증한 Seminar resource reference: ' + resourceReferences.length + '개')
console.log('Root URL path: ' + pages.sitePrefix)
console.log('Seminar URL path: ' + pages.basePath)
