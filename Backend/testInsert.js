const mongoose = require('mongoose');
const Survey = require('./models/surveySchema');  // Adjust path if needed

mongoose.connect('mongodb://localhost:27017/surveyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');

    const surveyData = new Survey({
        Name: "Abhinav Kumar",
        CollegeName: "ABC College",
        Email: "abhinav.kumar@example.com",
        MobileNumber: "9876543210",
        Course: "B.Tech",
        DepartmentName: "CSE",
        AreaOfInterest: "Artificial Intelligence",
        Description: "AI is amazing."
    });

    try {
        const savedData = await surveyData.save();
        console.log('Survey data saved:', savedData);
    } catch (error) {
        console.error('Error saving survey data:', error);
    } finally {
        mongoose.connection.close();
    }

}).catch(err => console.error('MongoDB connection error:', err));
