const express = require('express')
const mongoose = require("mongoose")
const app = express()
const config = require('config')
const PORT = config.get('port')
const mongoUri = config.get('mongoUri')
const path = require('path')

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/link', require('./routes/link.route'))
app.use('/t', require('./routes/redirect.route'))

if (process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(() => console.log("Connect to mongoDB"))
            .catch(() => console.log("Error connecting MongoDB"))
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))

    } catch (e) {
        console.log('Serverda qandaydir xatolik yuz berdi')
        process.exit(1)
    }
}

start()