const express = require('express')
const app = express()
const port = 3013

// 跨域设置
app.use('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  // res.setHeader("Access-Control-Allow-Origin", req.get("Origin")); // 添加这一行代码，代理配置不成功
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since')
  next()
})

app.use('/', require('./src/index'))

app.use('*', (req, res) => {
  res.json({
    code: 404,
    message: '404 NOT FOUND',
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
