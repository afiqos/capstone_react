 import './App.css';
 import React, { useState, useEffect } from 'react';

function App() {
  const [imageFile, setImageFile] = useState('');
  const [imagePreview, setImgPreview] = useState('');
  const [downloadedImage, setDownloadImage] = useState('');

  function handleFileChange(e) {
    console.log(e.target.files[0].name);
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      
      setImgPreview(URL.createObjectURL(e.target.files[0]));
      URL.revokeObjectURL(imagePreview);
    }
  }

  function handleClick() {
    // fetch('http://localhost:8080/')
    sendImage();
  }

  async function sendImage() {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch("http://localhost:8080/", {
        method: "POST",
        body: formData,
      });
      console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDownload() {
    try {
      const response = await fetch('http://localhost:8080/image/253');
      const data = await response.json();
      console.log(data);
      console.log(data['filename']);
      setDownloadImage(`http://localhost:8080/upload-dir/${data['filename']}`);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  return (
    <div className="App">
      <img src={"http://localhost:8080/upload-dir/testFile.png"}></img>
      
      <input type="file" name="imageFile" onChange={handleFileChange} />
      <img src={imagePreview}></img>
      <button onClick={handleClick}>Upload Image</button>
      <button onClick={handleDownload}>Download Latest Image</button>
      <img src={downloadedImage}></img>
    </div>
  );
}

export default App;
