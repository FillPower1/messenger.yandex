const express = require('express')

const app = express()
const PORT = 3000 || process.env.PORT

app.use(express.static('./static'))
    .use('/target', express.static('./target'))
    .listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
