const http = require('node:http')
const dittoJSON = require('./ditto.json')

const proccessRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('Hello World!')
        case '/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('404 Not Found')
      }
    case 'POST':
      switch (url) {
        case '/pokemon' :
        {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const { name, type } = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            return res.end(JSON.stringify({ name, type }))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('404 Not Found')
      }
  }
}

const server = http.createServer(proccessRequest)

server.listen(1234, () => {
  console.log('Server is running on http://localhost:1234')
})
