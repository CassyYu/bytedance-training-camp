const http = require('http')

// cookie里不能存太多东西
const session = {}

http.createServer((req, res) => {
  console.log('cookie:', req.headers.cookie)

  const session
  
  res.setHeader('Set-Cookie', `abc=123;`)
  res.end('Hello')
}).listen(3000)