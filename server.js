const express = require('express')

const app = express()
const PORT = 3000 || process.env.PORT

app.use(express.static('./static'))

app.listen(PORT, () => console.log('Сервер запущен'))
