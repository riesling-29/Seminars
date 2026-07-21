import { createReadStream } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { getPagesConfig, stagingRoot } from './pages-config.mjs'

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
])

const pages = getPagesConfig()
const port = Number.parseInt(process.env.PORT || '4173', 10)

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('유효하지 않은 PORT입니다: ' + process.env.PORT)
}

await access(path.join(stagingRoot, 'index.html'))

function sendText(response, statusCode, body) {
  response.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  })
  response.end(body)
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || '/', 'http://localhost')
    const pathname = decodeURIComponent(requestUrl.pathname)

    if (pathname === '/') {
      response.writeHead(302, { Location: pages.sitePrefix })
      response.end()
      return
    }

    if (pathname === pages.sitePrefix.slice(0, -1)) {
      response.writeHead(302, { Location: pages.sitePrefix })
      response.end()
      return
    }

    if (!pathname.startsWith(pages.sitePrefix)) {
      sendText(response, 404, 'Pages site prefix 밖의 경로입니다.')
      return
    }

    const relativeUrlPath = pathname.slice(pages.sitePrefix.length)
    let filePath = path.resolve(
      stagingRoot,
      relativeUrlPath.split('/').filter(Boolean).join(path.sep),
    )

    if (filePath !== stagingRoot && !filePath.startsWith(stagingRoot + path.sep)) {
      sendText(response, 403, '허용되지 않은 경로입니다.')
      return
    }

    const fileStats = await stat(filePath)
    if (fileStats.isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }

    const contentType = contentTypes.get(path.extname(filePath).toLowerCase())
      || 'application/octet-stream'
    response.writeHead(200, {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
    })
    createReadStream(filePath).pipe(response)
  } catch (error) {
    if (error?.code === 'ENOENT') {
      sendText(response, 404, '파일을 찾을 수 없습니다.')
      return
    }
    console.error(error)
    sendText(response, 500, '로컬 preview 오류')
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log('Pages preview: http://127.0.0.1:' + port + pages.sitePrefix)
  console.log('Seminar preview: http://127.0.0.1:' + port + pages.basePath)
  console.log('종료: Ctrl+C')
})

function closeServer() {
  server.close(() => process.exit(0))
}

process.on('SIGINT', closeServer)
process.on('SIGTERM', closeServer)

