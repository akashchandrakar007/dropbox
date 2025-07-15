const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // to serve uploaded files
app.use('/api/files', fileRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
