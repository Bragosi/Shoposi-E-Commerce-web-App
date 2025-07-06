const express =  require('express')
const cors =  require('cors')
require('dotenv').config()
const connectDB = require('./config/db')


const authRoutes = require('./routes/auth')

const app = express()
// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api', authRoutes)

// database and server start

const PORT = process.env.PORT || 8080; 

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
});