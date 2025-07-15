const fs = require('fs');
const path = require('path');

const File = require('../models/File');

const uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fileData = new File({
    originalName: req.file.originalname,
    storedName: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
  });

  await fileData.save();

  res.status(200).json({ filename: req.file.filename });
};

const getAllFiles = async (req, res) => {
  const files = await File.find().sort({ uploadDate: -1 });
  res.json(files);
};

const downloadFile = (req, res) => {
  const file = `uploads/${req.params.filename}`;
  res.download(file);
};

module.exports = { uploadFile, getAllFiles, downloadFile };
