const fs = require('fs');
const path = require('path');

const uploadFile = (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  res.status(200).json({ filename: req.file.filename });
};

const getAllFiles = (req, res) => {
  const dir = './uploads';
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).send('Unable to scan files');
    res.json(files);
  });
};

const downloadFile = (req, res) => {
  const file = `uploads/${req.params.filename}`;
  res.download(file);
};

module.exports = { uploadFile, getAllFiles, downloadFile };
