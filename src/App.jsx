import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetStyle from "./style/ResetStyle";
import GlobalStyle from "./style/GlobalStyle";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/Signup/SignupPage";
import HomePage from "./components/Home/HomePage";
import { UserProvider } from "./components/UserContext/UserContext";
import UserPage from "./components/User/User";

export default function App() {
  return (
    <UserProvider>
      <ResetStyle />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users/:ID_DO_USUARIO" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
