// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`MongoDB Connected: ${process.env.MONGO_URI}`))
    .catch(error => {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    });

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api', medicineRoutes);

// Start server
const PORT = process.env.PORT || 6013;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
