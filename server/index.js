const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userroute = require("./routes/userroutes");
const trainerroute = require("./routes/trainerroutes");
const trainingroute = require("./routes/trainigroutes");
require('dotenv').config()

app.use(cors());
app.use(express.json())
// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userroute);
app.use('/api/trainer', trainerroute);
app.use('/api/training', trainingroute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// MongoDB connection
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
const dbName = 'test';


 mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });
  