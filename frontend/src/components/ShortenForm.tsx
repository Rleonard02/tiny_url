import React, { useState } from "react";
import "./ShortenForm.css";

const ShortenForm: React.FC = () => {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    //send post request containing long url
    //get short url back in response
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalURL: url }),
      });

      const data = await response.json();
      console.log("this is the data: ", data);

      //if the response is valid: set the shortURL to the response value
      if (response.ok) {
        setShortCode(data.shortCode);
      } else {
        console.error(data.message);
      }
    } catch (error) {
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
          Your Short URL: {window.location.origin}/{shortCode}
        </p>
      )}
    </div>
  );
};

export default ShortenForm;
