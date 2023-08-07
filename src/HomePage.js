import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

const DraggableLetter = ({ letter }) => {
  return (
    <Draggable>
      <div style={{ display: "inline-block", cursor: "move", margin: "5px" }}>
        {letter}
      </div>
    </Draggable>
  );
};

const HomePage = () => {
  const [backgroundColor, setBackgroundColor] = useState("white");

  const text = "nth tyPonoMy";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setBackgroundColor("pink");
      } else {
        setBackgroundColor("white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ backgroundColor: backgroundColor, minHeight: "200vh" }}>
      <div className="container mt-5">
        <h1>Welcome to My Homepage</h1>
        <img
          src="https://example.com/path-to-your-image.jpg"
          alt="Description of Image"
          className="img-fluid"
        />

        <p className="lead">
          This is a brief introduction about the website or yourself...
        </p>

        <div style={{ marginTop: "20px" }}>
          {text.split("").map((letter, index) => (
            <DraggableLetter key={index} letter={letter} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
