const express = require('express')
const router = express.Router()

const c = require('../controllers/ftp')

router.get('/', (req, res) => {
  res.send('<h1>FTP Started</h1>')
})

router.get('/list/*', async (req, res) => {
  let { err, files } = await c.list('/' + req.params[0])
  res.send({
    code: 200,
    message: '',
    path: '/' + req.params[0],
    data: files,
  })
})

module.exports = router
