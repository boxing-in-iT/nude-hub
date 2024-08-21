import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import WelcomePage from "./components/welcomePage";
import Examples from "./components/examples";
import DatingApps from "./components/dating-apps";
import Pricing from "./components/pricing";
import Faq from "./components/faq";
import Footer from "./components/footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Main />
        {/* <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer /> */}
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
