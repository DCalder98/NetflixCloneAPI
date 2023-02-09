const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const listRoutes = require('./routes/lists')

dotenv.config()

const PORT = process.env.PORT || 3500



mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => { console.log("DB Connection Successful") })
.catch((err) => {
    console.log(err)
})

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/movies', moviesRoutes)
app.use('/api/lists', listRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})