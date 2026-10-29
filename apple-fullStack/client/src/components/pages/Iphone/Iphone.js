import React, { useEffect, useState } from "react";
import "./Iphone.css";

function Iphone() {
  const [iphone, setIphone] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Use environment variable for API URL
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
    
    console.log("✅ Fetching from backend...");

    fetch(`${API_URL}/iphone`)
      .then((res) => {
        console.log("✅ Response Status:", res.status);
        if (!res.ok) {
          throw new Error(`Backend returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ BACKEND DATA RECEIVED:", data);
        setIphone(data.products);
      })
      .catch((err) => {
        console.log("❌ FETCH FAILED:", err);
        setError("The iPhone catalog is unavailable. Start MySQL and restart the backend.");
      });
  }, []);

  return (
    <div className="iphone-page">
      <h1 className="iphone-title">Iphones</h1>
      <p className="iphone-subtitle">The best for the brightest.</p>

      {error && <p className="iphone-error">{error}</p>}

      {!error && iphone.length === 0 && (
        <p className="iphone-error">No iPhone products are available.</p>
      )}

      {Array.isArray(iphone) &&
        iphone.map((item) => (
          <div className="iphone-container" key={item.product_name}>
            <div className="iphone-image">
              <img
                src={item.product_img}
                alt={item.product_name}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>

            <div className="iphone-info">
              <img
                src={"../../../../server/images/iphone/iphone-se.png"}
                alt="img"
              />
              <h2>{item.product_name}</h2>
              <p className="brief">{item.product_brief_description}</p>
              <p className="price">Starting at {item.starting_price}</p>
              <p className="range">{item.price_range}</p>
              <a className="link" href={item.product_link}>
                Learn more
              </a>
            </div>
          </div>
        ))}

      {/* {iphone.map((item) => (
        <div className="iphone-container" key={item.product_name}>
          <div className="iphone-image">
            <img
              src={item.product_img}
              alt={item.product_name}
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>

          <div className="iphone-info">
            <h2>{item.product_name}</h2>
            <p className="brief">{item.product_brief_description}</p>
            <p className="price">Starting at {item.starting_price}</p>
            <p className="range">{item.price_range}</p>
            <a className="link" href={item.product_link}>
              Learn more
            </a>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default Iphone;
