import React, { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  };

  const handleSubmit = async () => {
    if (!image) return alert("Upload an image first.");
    setLoading(true);

    // Placeholder for API call
    setTimeout(() => {
      setResult("Jawline score: 6/10 — Needs sharpening.\nRecommended: Mewing + Neck curls");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="app">
      <h1>not.ai — Facial & Physique Improvement</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="preview" className="preview" />}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && <pre className="result">{result}</pre>}
    </div>
  );
}

export default App;
