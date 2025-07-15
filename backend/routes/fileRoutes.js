const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadFile,
  getAllFiles,
  downloadFile
} = require('../controllers/fileController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getAllFiles);
router.get('/download/:filename', downloadFile);

module.exports = router;
