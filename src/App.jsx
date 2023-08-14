import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetStyle from "./style/ResetStyle";
import GlobalStyle from "./style/GlobalStyle";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/Signup/SignupPage";
import HomePage from "./components/Home/HomePage";
import ServicePage from "./components/ServicePage/ServicePage";

export default function App() {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/service/:idService" element={<ServicePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
