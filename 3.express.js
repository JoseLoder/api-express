const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 1234
app.disable('x-powered-by')

// Middleware
// Si no le pasamos la ruta, se ejecutará en todas las rutas
// 'app.use(express.json())' es lo mismo que hacer:

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  console.log(`Request: ${req.method}`)

  let body = ''
  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const newPokemon = JSON.parse(body)
    // Mutar la request
    req.body = newPokemon
    next()
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Mi página con Express</h1>')
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>Page not found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
