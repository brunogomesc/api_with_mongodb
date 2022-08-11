const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const personRoutes = require('./routes/personRoutes')

const app = express()

app.use(
      express.urlencoded({
            extended: true
      })
)

app.use(express.json())

//routes
app.get('/', (req, res) => {
      res.json({statusApi: "API is running!"})
})

app.use('/person', personRoutes)

mongoose.connect(
      config.connectionStringMongoDB
).then(()=> {
      console.log(Date(Date.now()) + ' - Conectamos ao MongoDB')
      app.listen(3000)
}).catch((error) => { console.log(error) })

