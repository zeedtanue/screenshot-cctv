const express = require('express')
const app = express()
const port = 3000
var serveIndex = require('serve-index');


app.use(express.static(__dirname + "/public"))
app.use('/live', serveIndex(__dirname + '/public/live'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})