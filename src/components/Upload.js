// src/components/Upload.js
import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    try {
      const response = await axios.post('http://18.234.58.157:8000/predict/', formData);
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload an Image</h2>
      <div className="upload-area">
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {result && (
        <div className="result-section">
          <h3>Detection Results</h3>
          <img src={`data:image/jpeg;base64,${result.annotatedImage}`} alt="Annotated" />
        </div>
      )}
    </div>
  );
};

export default Upload;
