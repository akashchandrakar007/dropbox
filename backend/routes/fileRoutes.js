const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadFile,
  getAllFiles,
  downloadFile
} = require('../controllers/fileController');

const allowedTypes = ['text/plain', 'application/json', 'image/png', 'image/jpeg'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ storage,fileFilter });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getAllFiles);
router.get('/download/:filename', downloadFile);

module.exports = router;
