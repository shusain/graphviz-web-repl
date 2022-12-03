const express = require('express')
const fs = require('fs')
const {execSync} = require('node:child_process')
const app = express()
const port = 3000

app.use(express.json())
app.get('/lastGenerated.png', (req, res) => {
  //fs.writeFileSync("graph.dot", req.body)
  execSync("dot graph.dot -T png -o out.png")
  res.sendFile("out.png", {root: __dirname})
})

app.post('/updateGraph', (req, res) => {
  console.log('graph update requested');
  console.log(req.body.data)
  fs.writeFileSync("graph.dot", req.body.data)
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static('public'))
