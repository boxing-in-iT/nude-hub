import React from "react";
import { useTranslation } from "react-i18next";
import match from "../../assets/examples/match.svg";
import happn from "../../assets/datingApps/happn.svg";
import tinder from "../../assets/datingApps/tinder.svg";
import badoo from "../../assets/datingApps/badoo.svg";
import okcupid from "../../assets/datingApps/okcupid.svg";
import "./index.css";

const DatingApps = () => {
  const { t } = useTranslation(); // Добавлен useTranslation хук

  return (
    <div className="dating-apps-section">
      <h2 className="datings-apps-subtitle">
        {t("works_for")} <span className="red">{t("all_dating")}</span>{" "}
        {t("apps")}
      </h2>

      <div className="example-dating-apps-container">
        <div className="example-dating-app">
          <img src={match} className="example-dating-app-photo" alt="match" />
        </div>
        <div className="example-dating-app">
          <img src={happn} className="example-dating-app-photo" alt="happn" />
        </div>
        <div className="example-dating-app">
          <img src={tinder} className="example-dating-app-photo" alt="tinder" />
        </div>
        <div className="example-dating-app">
          <img src={badoo} className="example-dating-app-photo" alt="badoo" />
        </div>
        <div className="example-dating-app">
          <img
            src={okcupid}
            className="example-dating-app-photo"
            alt="okcupid"
          />
        </div>
      </div>
    </div>
  );
};

export default DatingApps;
