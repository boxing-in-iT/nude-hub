import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import WelcomePage from "./components/welcomePage";
import Examples from "./components/examples";
import DatingApps from "./components/dating-apps";
import Pricing from "./components/pricing";
import Faq from "./components/faq";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Header />
      <WelcomePage />
      <Examples />
      <DatingApps />
      <Pricing />
      <Faq />
      <Footer />
    </>
  );
}

export default App;
