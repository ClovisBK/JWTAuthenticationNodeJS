const express = require('express');
const verifyToken = require('./middleware/middleware');
const authorizeRole = require('./middleware/roleMiddleware');
const app = express();
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');

app.use(cors({
    origin: 'https://kebehcard.vercel.app', 
    credentials: true
}));

app.use(express.json());
app.use('/V1/api/auth', authRoutes);
app.use('/V1/api/users', verifyToken, userRoutes);
app.use('/V1/api/admin',verifyToken, authorizeRole("admin"), adminRoutes);
app.use('/V1/api/pharmacy', verifyToken, authorizeRole("pharmacy"), pharmacyRoutes);


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () =>{
    console.log(`Server is running on port [::]${PORT}`);
    
});