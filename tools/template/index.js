
const path = require('path')
const fs = require('fs-extra')
const { exec } = require('child_process');


//没有.build目录则创建
const folderPath = path.join(__dirname, '..', '..', '.builder')
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath)
}


//没有默认数据则创建
const filePath = path.join(folderPath, 'template')
if (!fs.existsSync(filePath)) {
  fs.copySync(path.join(__dirname, 'files'), filePath)
}

var interval = setInterval(function () {
  console.log('[template]installing for template')
}, 1000)
exec('npm install', { cwd: filePath, maxBuffer: 2 * 1024 * 1024 }, function (err) {
  if (err) {
    throw err
  }
  clearInterval(interval)
  console.log('[template]npm install finished !!!')

  startServer()

  function startServer() {
    console.log('[template]starting template project !!')
    exec('npm run dev', { cwd: filePath, maxBuffer: 2 * 1024 * 1024 }, function (err) {
      console.log('[template]template project stoped !!')
      startServer()
    })
  }
})