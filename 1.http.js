const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT || 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.end('<h1>Hello, World! my friend</h1>')
  } else if (req.url === '/imagen-del-dev.jpeg') {
    fs.readFile('./foto-yo.jpeg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })
  } else if (req.url === '/about') {
    res.end('<h1>About Us</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>Page Not Found</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server is running on http://localhost:${desiredPort}`)
})
