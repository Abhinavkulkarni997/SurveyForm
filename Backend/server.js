// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import surveyRoutes from './routes/surveyRoutes.js';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const surveyRoutes = require('./routes/surveyRoutes');

const app=express();
dotenv.config();
process.env.MONGODB_URL='mongodb://localhost:27017'

// middlewware 
app.use(cors());
app.use(bodyParser.json());


// Mongodb connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { 
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
// routes
app.use('/api/surveys', surveyRoutes);
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})