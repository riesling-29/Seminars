import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// Run after all three seminars have been staged by the Pages workflow.
const root = fileURLToPath(new URL('../..', import.meta.url))
const staging = path.join(root, '_pages')
const sitemap = await readFile(path.join(staging, 'sitemap.xml'), 'utf8')
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
assert.equal(locations.length, 4, 'Sitemap must include the landing and three seminars')
assert.equal(new Set(locations).size, locations.length, 'Duplicate sitemap URL')

for (const location of locations) {
  const url = new URL(location)
  assert.equal(url.origin, 'https://riesling-29.github.io')
  assert(url.pathname.startsWith('/Seminars/'), 'Sitemap URL escaped the project path')
  assert(!url.search && !url.hash, 'Sitemap must use canonical page URLs')
  await access(path.join(staging, url.pathname.slice('/Seminars/'.length), 'index.html'))
}

const landing = await readFile(path.join(staging, 'index.html'), 'utf8')
assert(!landing.includes('__REPOSITORY_URL__'), 'Repository URL was not replaced')
for (const [, href] of landing.matchAll(/href="(\.\/[^"?]*)/g)) {
  await access(path.join(staging, href, 'index.html'))
}
const fallback = await readFile(path.join(staging, '404.html'), 'utf8')
assert(fallback.includes('/Seminars/ai-agent-harness-seminar/assets/'), 'Harness history-route fallback missing')
console.log('Pages integration validated: four sitemap URLs, local destinations and harness fallback')
