(async () => {
  const { MongoClient } = require('mongodb')

  const client = new MongoClient(
    'mongodb://localhost:27017',
    {
      useNewUrlParser: true
    }
  )

  let ret = await client.connect()
  const db = client.db('test')

  const fruits = db.collection('fruits')
  //添加文档
  ret = await fruits.findOne({
    name: '芒果',
    price: 3.5
  })
  console.log('insert', ret)
})