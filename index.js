const express = require('express')
const app = express()
const port = 3013

// 跨域设置
app.use('*', function (req, res, next) {
  // 设置允许跨域的域名,*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type')
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options') {
    res.send(200)
  } else {
    next()
  }
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
