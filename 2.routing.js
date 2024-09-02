const http = require('node:http')

const proccessRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('Hello World!')
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end('404 Not Found')
      }
  }
}

const server = http.createServer(proccessRequest)

server.listen(1234, () => {
  console.log('Server is running on http://localhost:1234')
})
