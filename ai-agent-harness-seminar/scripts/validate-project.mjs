import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDirectory, '..')

const requiredFiles = [
  'AGENTS.md',
  'README.md',
  '.gitignore',
  'package.json',
  'package-lock.json',
  'slides.md',
  'style.css',
  'components/AgentLoopDiagram.vue',
  'layouts/section.vue',
  'docs/SEMINAR_CONTEXT.md',
  'docs/SEMINAR_STORYBOARD.md',
  'docs/CONTENT_EVIDENCE_POLICY.md',
  'docs/DESIGN_PRINCIPLES.md',
  'docs/DEMO_PLAN.md',
  'docs/DECISION_LOG.md',
  'handouts/AGENT_TASK_CONTRACT_TEMPLATE.md',
  'handouts/USE_CASE_CANVAS.md',
  'handouts/SAFETY_CHECKLIST.md',
  'handouts/AGENT_EVALUATION_TEMPLATE.md',
  'demos/vibration-agent/README.md',
  'demos/edge-build-agent/README.md',
  'speaker-notes/README.md',
  'speaker-notes/REHEARSAL_CHECKLIST.md',
]

const ignoredDirectories = new Set(['node_modules', 'dist', '.slidev'])
const textExtensions = new Set(['.md', '.mjs', '.js', '.ts', '.vue', '.json', '.yaml', '.yml', '.txt'])
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

  const content = await readFile(absolutePath, 'utf8')
  if (content.trim().length === 0) {
    failures.push('빈 필수 파일: ' + relativePath)
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

  const content = await readFile(entry.absolutePath, 'utf8')
  const lines = content.split(/\r?\n/)
  lines.forEach((line, index) => {
    if (/\b(?:TODO|TBD)\s*(?:\([^)]*\))?\s*:/i.test(line)) {
      markers.push(normalizedPath + ':' + (index + 1) + ': ' + line.trim())
    }
  })
})

const packagePath = path.join(projectRoot, 'package.json')
if (await exists(packagePath)) {
  const packageJson = JSON.parse(await readFile(packagePath, 'utf8'))
  for (const scriptName of ['dev', 'build', 'validate']) {
    if (!packageJson.scripts?.[scriptName]) {
      failures.push('package.json script 없음: ' + scriptName)
    }
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
  console.log('프로젝트 검증 성공: 필수 파일 ' + requiredFiles.length + '개, 중첩 .git 없음')
}
