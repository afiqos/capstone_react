 import './App.css';
 import React, { useState, useEffect } from 'react';

function App() {
  const [imageFile, setImageFile] = useState('');
  const [imagePreview, setImgPreview] = useState('');

  function handleClick() {
    fetch('http://localhost:8080/')
  }

  function handleFileChange(e) {
    console.log(e.target.files[0].name);
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      
      setImgPreview(URL.createObjectURL(e.target.files[0]));
      URL.revokeObjectURL(imagePreview);
    }
  }

  return (
    <div className="App">
      <img src={"http://localhost:8080/upload-dir/testFile.png"}></img>
      
      <input type="file" name="imageFile" onChange={handleFileChange} />
      <img src={imagePreview}></img>
      <button onClick={handleClick}>
        Upload Image
      </button>
    </div>
  );
}

export default App;
