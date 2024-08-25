import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import AccountPage from "./pages/account";
import ImageDownloader from "./pages/image-downloader";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<AccountPage />} />

            {/* <Route path="/account" element={<ImageDownloader />} /> */}
          </Route>
          <Route path="/image" element={<ImageDownloader />} />
        </Routes>
        {/* <ImageDownloader /> */}
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
