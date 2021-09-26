// 数据库中间件（操作对象->操作数据库）

(async () => {
  const Sequelize = require('sequelize')
  const sequelize = new Sequelize('kaikeba', 'root', 'example', {
    host: 'localhost',
    dialiect: 'mysql',
    operatiorsAliases: false
  })

  // TBL_FRUIT 为啥不这么写：是一个集合

  // 定义模型
  const Fruit = sequelize.define("Fruit", {
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  });

  let ret = await Fruit.sync()

  ret = await Fruit.create({
    name: '香蕉',
    price: 3.5
  })
  console.log('create', ret)
})