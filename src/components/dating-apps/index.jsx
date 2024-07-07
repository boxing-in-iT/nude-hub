import React from "react";
import match from "../../assets/examples/match.svg";
import happn from "../../assets/datingApps/happn.svg";
import tinder from "../../assets/datingApps/tinder.svg";
import badoo from "../../assets/datingApps/badoo.svg";
import okcupid from "../../assets/datingApps/okcupid.svg";

const DatingApps = () => {
  return (
    <section className="dating-apps-section">
      <h2 className="example-subtitle">WORKS FOR ALL DATING APPS</h2>

      <div className="example-dating-apps-container">
        <div className="example-dating-app">
          <img src={match} />
        </div>
        <div className="example-dating-app">
          <img src={happn} />
        </div>
        <div className="example-dating-app">
          <img src={tinder} />
        </div>
        <div className="example-dating-app">
          <img src={badoo} />
        </div>
        <div className="example-dating-app">
          <img src={okcupid} />
        </div>
      </div>
    </section>
  );
};

export default DatingApps;
