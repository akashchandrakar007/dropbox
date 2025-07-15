const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // to serve uploaded files
app.use('/api/files', fileRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
