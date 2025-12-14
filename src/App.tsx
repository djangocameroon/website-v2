import { Footer, Navbar } from "./components/layout";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Auth from "./pages/auth/Auth";
import { ForgotPassword, ResetPassword } from "./pages/auth/forgot-password";
import About from "./pages/About";
import Blog from "./pages/blog/Blog";

import { Toaster } from "react-hot-toast";

const AppContent = () => {
  const location = useLocation();

  const isBlogPage = location.pathname === "/blog";
  const isAuthPage = location.pathname.startsWith("/auth");

  const shouldHideNavbar = isBlogPage || isAuthPage;

  return (
    <div className="relative h-full max-w-[4000px]">
      {!shouldHideNavbar && (
        <div className="fixed top-0 z-30 w-full overflow-hidden">
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      <div className="bg-transparent">
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;