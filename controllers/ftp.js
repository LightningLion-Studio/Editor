const Client = require('ftp')

const c = new Client()

//切换目录
function cwd(dirpath) {
  return new Promise((resolve, reject) => {
    c.cwd(dirpath, (err, dir) => {
      resolve({ err: err, dir: dir })
    })
  })
}

//列出目标目录
async function list(dirpath) {
  let { err: ea, dir } = await cwd(dirpath)
  return new Promise((resolve, reject) => {
    c.list((err, files) => {
      resolve({ err: err, files: files })
    })
  })
}
c.on('ready', () => {
  console.log('ftp is ready')
})

c.connect(require('../config').ftp)

module.exports = {
  list,
}
