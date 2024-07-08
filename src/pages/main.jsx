import React from "react";
import WelcomePage from "../components/welcomePage";
import Examples from "../components/examples";
import DatingApps from "../components/dating-apps";
import Pricing from "../components/pricing";
import Faq from "../components/faq";

const Main = () => {
  return (
    <>
      <WelcomePage />
      <Examples />
      <DatingApps />
      <Pricing />
      <Faq />
    </>
  );
};

export default Main;
