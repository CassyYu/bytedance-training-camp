
// /api/user GET
// /api/user/1 GET
// /api/users POST PUT DELETE

const Koa = require('koa')
const app = new Koa()

// 注册路由
const config = require('./conf')
const {loadModel} = require('./framework/loader.js')
loadModel(config)(app)

app.listen(3000, () => {
  console.log('Server at 3000')

})