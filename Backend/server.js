const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const surveyRoutes = require('./routes/surveyRoutes');

const app=express();
dotenv.config();
process.env.MONGODB_URL='mongodb://localhost:27017/surveyDB';

// middleware 
app.use(cors());
app.use(express.json());

// routes
app.use('/api/surveys', surveyRoutes);
// Mongodb connection
mongoose.connect(process.env.MONGODB_URL, {
    bufferCommands:3000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { 
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})