import React from "react";
import match from "../../assets/examples/match.svg";

const DatingApps = () => {
  return (
    <section className="dating-apps-section">
      <h2 className="example-subtitle">WORKS FOR ALL DATING APPS</h2>

      <div className="example-dating-apps-container">
        <div className="example-dating-app">
          <img src={match} />
        </div>
        <div className="example-dating-app">
          <img src={match} />
        </div>
        <div className="example-dating-app">
          <img src={match} />
        </div>
        <div className="example-dating-app">
          <img src={match} />
        </div>
        <div className="example-dating-app">
          <img src={match} />
        </div>
      </div>
    </section>
  );
};

export default DatingApps;
