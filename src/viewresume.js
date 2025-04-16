import React, { useState, useEffect } from "react";
import "./viewresume.css";
import res from "./res.png";
import { motion } from "framer-motion";

export default function Viewresume() {
  const [showres, setshowres] = useState(false);
  const [captionVisible, setCaptionVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaptionVisible((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleShowResume = () => {
    setshowres(true);
  };

  const handleCloseResume = () => {
    setshowres(false);
  };

  const handleDownloadResume = () => {
    window.open(
      "https://drive.google.com/uc?export=download&id=1uv7hAkJmnzL4FBkqZm13f8b88T7G6Yed",
      "_blank"
    );
  };

  return (
    <>
      <section className={showres ? "blurred" : ""}>
        <section className="content">
          {!showres ? (
            <div className="resume-preview">
              <button className="open-btn" onClick={handleShowResume}>
                <img src={res} alt="Resume Icon" id="res" />
              </button>

              <motion.p
                className="resume-caption"
                animate={{
                  opacity: captionVisible ? 1 : 0,
                  x: captionVisible ? 0 : -20,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                View My Resume !
              </motion.p>
            </div>
          ) : (
            <div className="resume-container">
              <iframe
                src="https://drive.google.com/file/d/1uv7hAkJmnzL4FBkqZm13f8b88T7G6Yed/preview"
                className="resume-pdf"
                allow="autoplay"  title="Resume PDF Preview"
              ></iframe>
              <div className="resume-buttons">
                <button className="close-btn" onClick={handleCloseResume}>
                  Close
                </button>
                <button className="download-btn" onClick={handleDownloadResume}>
                  Download Resume
                </button>
              </div>
            </div>
          )}
        </section>
      </section>
    </>
  );
}
