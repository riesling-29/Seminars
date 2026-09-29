import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from '@slidev/parser'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDirectory, '..')
const repositoryRoot = path.resolve(projectRoot, '..')

const requiredFiles = [
  'AGENTS.md',
  'README.md',
  '.gitignore',
  'package.json',
  'package-lock.json',
  'slides.md',
  'style.css',
  'layouts/deck.vue',
  'components/Ev.vue',
  'styles/index.ts',
  'styles/deck.css',
  'public/fonts/OFL.txt',
  'public/fonts/seminar-kr.woff2',
  'public/favicon.svg',
  'docs/EVIDENCE_POLICY.md',
  'docs/SOURCES_2026-09-29.md',
  'scripts/pages-config.mjs',
  'scripts/build-pages.mjs',
  'scripts/preview-pages.mjs',
]

const requiredRepositoryFiles = [
  '.gitignore',
  '.github/pages/index.html',
  '.github/workflows/deploy-seminars-pages.yml',
]

const ignoredDirectories = new Set(['node_modules', 'dist', '_pages', '.slidev'])
const textExtensions = new Set(['.md', '.mjs', '.js', '.ts', '.vue', '.json', '.yaml', '.yml', '.txt'])
const bannedPatterns = [
  { pattern: /\$\s?500\b/, reason: '확인되지 않은 가격·상금 표현' },
  { pattern: /\b(?:api[_-]?key|secret[_-]?key|access[_-]?token)\s*[:=]\s*\S{8,}/i, reason: '자격 증명으로 보이는 값' },
]
const rumorPattern = /Aeon|[“"]o[”"]/
const hypothesisBadge = /<Ev\s+kind="(?:hypothesis|unavailable)"/
const minSlides = 14
const maxSlides = 18
const failures = []
const markers = []

async function exists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

async function walk(directory, visit, relativeDirectory = '') {
  const entries = await readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name)
    const absolutePath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      await visit({ type: 'directory', relativePath, absolutePath })
      if (!ignoredDirectories.has(entry.name) && entry.name !== '.git') {
        await walk(absolutePath, visit, relativePath)
      }
    } else if (entry.isFile()) {
      await visit({ type: 'file', relativePath, absolutePath })
    }
  }
}

for (const relativePath of requiredFiles) {
  const absolutePath = path.join(projectRoot, relativePath)
  if (!(await exists(absolutePath))) {
    failures.push('필수 파일 없음: ' + relativePath)
    continue
  }
  if ((await stat(absolutePath)).size === 0) {
    failures.push('빈 필수 파일: ' + relativePath)
  }
}

for (const relativePath of requiredRepositoryFiles) {
  const absolutePath = path.join(repositoryRoot, relativePath)
  if (!(await exists(absolutePath))) {
    failures.push('필수 저장소 파일 없음: ' + relativePath)
    continue
  }
  const content = await readFile(absolutePath, 'utf8')
  if (content.trim().length === 0) {
    failures.push('빈 필수 저장소 파일: ' + relativePath)
  }
}

await walk(projectRoot, async (entry) => {
  const normalizedPath = entry.relativePath.split(path.sep).join('/')

  if (entry.type === 'directory' && path.basename(entry.relativePath) === '.git') {
    failures.push('중첩 .git 디렉터리 발견: ' + normalizedPath)
    return
  }

  if (entry.type !== 'file' || !textExtensions.has(path.extname(entry.relativePath).toLowerCase())) {
    return
  }
  if (normalizedPath === 'package-lock.json' || normalizedPath === 'scripts/validate-project.mjs') {
    return
  }

  const content = await readFile(entry.absolutePath, 'utf8')
  const lines = content.split(/\r?\n/)
  lines.forEach((line, index) => {
    if (/\b(?:TODO|TBD)\s*(?:\([^)]*\))?\s*:/i.test(line)) {
      markers.push(normalizedPath + ':' + (index + 1) + ': ' + line.trim())
    }
    for (const { pattern, reason } of bannedPatterns) {
      if (pattern.test(line)) {
        failures.push(reason + ': ' + normalizedPath + ':' + (index + 1))
      }
    }
  })
})

const slidesPath = path.join(projectRoot, 'slides.md')
if (await exists(slidesPath)) {
  const deck = await parse(await readFile(slidesPath, 'utf8'))
  const total = deck.slides.length

  if (total < minSlides || total > maxSlides) {
    failures.push('슬라이드 수가 ' + minSlides + '~' + maxSlides + '장 범위 밖: ' + total)
  }

  for (const [index, slide] of deck.slides.entries()) {
    const number = index + 1
    const visibleContent = slide.content.replace(/<!--[\s\S]*?-->/g, '').trim()
    const frontmatter = slide.frontmatter || {}
    const classes = String(frontmatter.class || '').split(/\s+/)
    const isStructural = classes.includes('cover') || classes.includes('section')

    if (!visibleContent) {
      failures.push('빈 슬라이드: ' + number)
      continue
    }

    if (frontmatter.layout !== 'deck') {
      failures.push('deck layout이 아닌 슬라이드: ' + number)
    }

    const isReferences = ['Agenda', 'References'].includes(frontmatter.section)
    const isFactual = /<Ev\s+kind="fact"/.test(visibleContent)
    if (!isStructural && !isReferences && isFactual) {
      const sources = Array.isArray(frontmatter.sources) ? frontmatter.sources : []
      if (sources.length === 0) {
        failures.push('FACT 라벨이 있지만 sources frontmatter가 없는 슬라이드: ' + number)
      }
      for (const source of sources) {
        if (!source?.name || !/^https:\/\//.test(source?.url || '')) {
          failures.push('sources 항목에 name 또는 https URL 없음: ' + number)
        }
      }
    }

    const heading = (frontmatter.section || '') + ' ' + visibleContent
    if (rumorPattern.test(heading) && !isStructural && !hypothesisBadge.test(visibleContent)) {
      failures.push('Aeon / "o" 언급에 HYPOTHESIS 또는 UNAVAILABLE 라벨이 없는 슬라이드: ' + number)
    }
  }

  console.log('Slidev 파서 확인: ' + total + '장')
}

const packagePath = path.join(projectRoot, 'package.json')
if (await exists(packagePath)) {
  const packageJson = JSON.parse(await readFile(packagePath, 'utf8'))
  for (const scriptName of ['dev', 'build', 'build:pages', 'preview:pages', 'validate']) {
    if (!packageJson.scripts?.[scriptName]) {
      failures.push('package.json script 없음: ' + scriptName)
    }
  }
}

const repositoryGitignorePath = path.join(repositoryRoot, '.gitignore')
if (await exists(repositoryGitignorePath)) {
  const repositoryGitignore = await readFile(repositoryGitignorePath, 'utf8')
  if (!repositoryGitignore.split(/\r?\n/).includes('_pages/')) {
    failures.push('저장소 .gitignore에 _pages/ 규칙 없음')
  }
}

const landingPath = path.join(repositoryRoot, '.github', 'pages', 'index.html')
if (await exists(landingPath)) {
  const landing = await readFile(landingPath, 'utf8')
  if (!landing.includes('href="./persistent-work-agents-seminar/"')) {
    failures.push('Landing Page에 ./persistent-work-agents-seminar/ 링크 없음')
  }
}

if (markers.length > 0) {
  console.log('TODO/TBD 목록:')
  markers.forEach((marker) => console.log('- ' + marker))
} else {
  console.log('TODO/TBD 없음')
}

if (failures.length > 0) {
  console.error('\n프로젝트 검증 실패:')
  failures.forEach((failure) => console.error('- ' + failure))
  process.exitCode = 1
} else {
  const requiredCount = requiredFiles.length + requiredRepositoryFiles.length
  console.log('프로젝트 검증 성공: 필수 파일 ' + requiredCount + '개, 증거 라벨·출처 규칙 통과, 중첩 .git 없음')
}
