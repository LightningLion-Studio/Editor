const express = require('express')
const app = express()
const port = 3013

app.use('/', require('./src/index'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
