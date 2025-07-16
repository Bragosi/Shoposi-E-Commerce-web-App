const express =  require('express')
const cors =  require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')


const authRoutes = require('./routes/auth')

const app = express()
// middleware
app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}))
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser())

// routes
app.use('/api', authRoutes)

// database and server start

const PORT = process.env.PORT || 8080; 

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
});