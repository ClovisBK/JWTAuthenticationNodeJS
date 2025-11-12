const express = require('express');
const authMiddleware = require('./middleware/middleware');
const app = express();
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors({
    origin: 'http://localhost:5175', 
    credentials: true
}));

app.use(express.json());
app.use('/V1/api/auth', authRoutes);
app.use('/V1/api/users', authMiddleware, userRoutes); 

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});