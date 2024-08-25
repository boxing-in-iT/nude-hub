import React from "react";
import WelcomePage from "../components/welcomePage";
import Pricing from "../components/pricing";
import Faq from "../components/faq";

const Main = () => {
  return (
    <>
      <WelcomePage />
      {/* <WelcomePage /> */}
      {/* <Examples /> */}
      {/* <DatingApps /> */}
      <Pricing />
      <Faq />
    </>
  );
};

export default Main;
