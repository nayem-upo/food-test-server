const express = require('express')
const app = express()
const fs = require("fs")
const port = process.env.PORT || 3000
const cors = require('cors')
app.use(cors())

const chefs = require('./chefs.json')

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})
app.get('/chefs', (req, res) => {
    res.send(chefs)
})
app.get('/details/:id', (req, res) => {
    fs.readFile('./chefs.json', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send("Error reading data file")
        }
        const allChef = JSON.parse(data)
        const detail = allChef.find((item) => item.id == req.params.id )
        if (!detail) {
            return res.status(500).send("Object not found")
        }
        res.status(500).send(detail)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})