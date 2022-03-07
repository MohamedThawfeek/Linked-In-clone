import React from "react";
import "./Widget.css";

const Widget = () => {
  return (
    <div className="widget">
      <iframe
        src="https://www.linkedin.com/embed/feed/update/urn:li:share:6905068772604948481"
        height="642"
        width="304"
        frameBorder="none"
        title="Embedded post"
        scrolling="no"
        className="frame"
      ></iframe>

      <iframe
        src="https://www.linkedin.com/embed/feed/update/urn:li:share:6897443714671767552"
        height="642"
        width="304"
        frameBorder="none"
        title="Embedded post"
        className="frame"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default Widget;
