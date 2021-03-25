const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000 || process.env.PORT

app
    .use(express.static(path.join(__dirname, './static')))
    .get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, './static/index.html'))
    })
    .listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
