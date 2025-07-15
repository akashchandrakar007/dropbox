import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/files';
const allowedTypes = ['text/plain', 'application/json', 'image/png', 'image/jpeg'];

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    const res = await axios.get(API);
    setFiles(res.data);
  };

  const upload = async () => {
    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
    alert('❌ Invalid file type. Allowed: txt, json, png, jpg');
    return;
  }
    const formData = new FormData();
    formData.append('file', selectedFile);
    await axios.post(`${API}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setSelectedFile(null);
    fetchFiles();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Dropbox</h1>
        <div className="flex items-center gap-2 mb-6">
          <input
            type="file"
            className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={upload}
          >
            Upload
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-2">Your Files:</h2>
    <ul className="space-y-2">
  {files.map((file, i) => (
    <li key={i}>
      <a
        href={`http://localhost:5000/uploads/${file.storedName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {file.originalName}
      </a>
      <span className="text-gray-500 text-sm ml-2">
        ({Math.round(file.size / 1024)} KB, {file.mimetype})
      </span>
    </li>
  ))}
</ul>

      </div>
    </div>
  );
}

export default App;
