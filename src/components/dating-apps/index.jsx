import React from "react";
import match from "../../assets/examples/match.svg";
import happn from "../../assets/datingApps/happn.svg";
import tinder from "../../assets/datingApps/tinder.svg";
import badoo from "../../assets/datingApps/badoo.svg";
import okcupid from "../../assets/datingApps/okcupid.svg";

const DatingApps = () => {
  return (
    <div className="dating-apps-section">
      <h2 className="datings-apps-subtitle">
        WORKS FOR <span className="red">ALL DATING</span> APPS
      </h2>

      <div className="example-dating-apps-container">
        <div className="example-dating-app">
          <img src={match} className="example-dating-app-photo" />
        </div>
        <div className="example-dating-app">
          <img src={happn} className="example-dating-app-photo" />
        </div>
        <div className="example-dating-app">
          <img src={tinder} className="example-dating-app-photo" />
        </div>
        <div className="example-dating-app">
          <img src={badoo} className="example-dating-app-photo" />
        </div>
        <div className="example-dating-app">
          <img src={okcupid} className="example-dating-app-photo" />
        </div>
      </div>
    </div>
  );
};

export default DatingApps;
