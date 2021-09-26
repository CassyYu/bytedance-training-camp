// 使用node搭建一个简易的服务器

const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
  const {url, method} = request
  if (url === '/' && method === 'GET') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        response.writeHead()
        console.log(err)
      } else {
        console.log('else')
        response.end(data)
      }
    })
  } else {
    console.log('nono')
    response.end('nono')
  }
})
.listen(3000, () => {
  console.log('Server at 3000')
})