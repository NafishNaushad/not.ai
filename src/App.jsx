import React, { useState, useEffect } from "react";
import { supabase } from "./ supabaseClient.js";
import "./App.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [result, setResult] = useState("");

  // ✅ Listen for auth changes and load user on mount
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user); 
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
  };

  const signIn = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  };

  const handleSubmit = async () => {
    if (!image) return alert("Upload an image first.");
    setAnalyzeLoading(true);

    // Simulated analysis
    setTimeout(() => {
      setResult(
        "Jawline score: 6/10 — Needs sharpening.\nRecommended: Mewing + Neck curls",
      );
      setAnalyzeLoading(false);
    }, 2000);
  };

  // 🔒 Not logged in
  if (!user) {
    return (
      <div className="app auth">
        <h1>Login to not.ai</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button onClick={signUp} disabled={loading}>
            Sign Up
          </button>
          <button onClick={signIn} disabled={loading}>
            Sign In
          </button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    );
  }

  // ✅ Logged in — show main app
  return (
    <div className="app">
      <h1>not.ai — Facial & Physique Improvement</h1>
      <button onClick={signOut}>Sign Out</button>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="preview" className="preview" />}

      <button onClick={handleSubmit} disabled={analyzeLoading}>
        {analyzeLoading ? "Analyzing..." : "Analyze"}
      </button>

      {result && <pre className="result">{result}</pre>}
    </div>
  );
}
