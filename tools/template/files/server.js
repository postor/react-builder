const express = require('express')
const next = require('next')
const spdy = require('spdy')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })


//routes
const routes = require('./tools/routes')
const handle = routes.getRequestHandler(app)

app.prepare()
.then(() => {
  const server = express()

  //static
  server.use('/static',express.static('static'))
  var bootstrapPath = path.dirname(path.dirname(require.resolve('bootstrap')))
  server.use('/static', express.static(bootstrapPath))
  server.get('/exit',()=>{
    process.exit()
  })

  //cookie
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())
  server.use(cookieParser())

  //next routes
  server.use(handle)

  //http
  server.listen(3009, (err) => {
    if (err) throw err
    console.log('> Ready http on http://localhost:3009')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})