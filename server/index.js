const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// const {
//   getDestinations,
//   deleteDestination, 
//   createDestination, 
//   updateDestination
// } = require('./controller')

const ctrl = require("./controller")

app.get(`/api/destinations`, ctrl.getDestinations)
app.delete(`/api/destinations/:id`, ctrl.deleteDestination)
app.post(`/api/destinations`, ctrl.createDestination)
app.put(`/api/destinations/:id`, ctrl.updateDestination)


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Over ${port}`)
})