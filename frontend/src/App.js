import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/files';

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    const res = await axios.get(API);
    setFiles(res.data);
  };

  const upload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    await axios.post(`${API}/upload`, formData);
    fetchFiles();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dropbox Clone</h2>

      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button onClick={upload}>Upload</button>

      <ul>
        {files.map((file, i) => (
          <li key={i}>
            <a href={`http://localhost:5000/uploads/${file}`} target="_blank" rel="noopener noreferrer">
              {file}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
