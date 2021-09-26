// 目的：更新文件列表后自动更新router
// 读文件列表
// 拼代码（模版渲染的方式）
const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk') // 很多地方要用怎么办（绑定在全局？）

module.exports = async () => {
  // 获取列表
    const list = fs.readdirSync('./src/views')
      .filter(v => v !== 'Home.vue')
      .map(v => ({
        name : v.replace('.vue', ''), // 去扩展名
        file : v,
      }))

    // 生成路由定义
    compile({list}, './src/router.js', './template/router.js.hbs')
    // 生成菜单
    compile({list}, './src/App.vue', './template/App.vue.hbs')

    /**
     * 
     * @param {*} meta 数据定义
     * @param {*} filePath 目标文件
     * @param {*} templatePath 模板
     */
    function compile(meta, filePath, templatePath) {
      if (fs.existsSync(templatePath)) {
        const content = fs.readFileSync(templatePath).toString()
        const result = handlebars.compile(content)(meta)
        fs.writeFileSync(filePath, result)
        console.log(chalk.green(`🔥创建成功`))
      }
    }
}
