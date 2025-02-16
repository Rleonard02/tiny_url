import React, { useState } from "react";
import "./ShortenForm.css";

const ShortenForm: React.FC = () => {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalURL: url }),
      });

      const data = await response.json();
      console.log("this is the data: ", data);

      if (response.ok) {
        setShortCode(data.shortCode);
      } else {
        console.log("uh oh!");
        console.error(data.message);
      }
    } catch (error) {
      console.log("uh oh!2");
      console.error(error);
    }
  };

  return (
    <div>
      <form className="urlForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {shortCode && (
        <p>
          Your Short URL:{" "}
          <a href={`http://localhost:8080/api/${shortCode}`}>
            {`http://localhost:8080/api/${shortCode}`}
          </a>
        </p>
      )}
    </div>
  );
};

export default ShortenForm;
