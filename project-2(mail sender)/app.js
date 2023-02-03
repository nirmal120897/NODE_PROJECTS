const express = require('express')
const app = express();
const controller = require('./controller/user')
PORT = 3000


app.listen(PORT, () => {
    console.log('server is running');
})


app.get('/', (req, res) => {
    res.send('helooo ......')
})


app.get('/mail', controller.sendmail)