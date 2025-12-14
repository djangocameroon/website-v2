import { lazy, Suspense, useEffect } from "react";
import { Footer, Navbar } from "./components/layout";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Lazy load all page components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const ForgotPassword = lazy(() => import("./pages/auth/forgot-password").then(module => ({ default: module.ForgotPassword })));
const ResetPassword = lazy(() => import("./pages/auth/forgot-password").then(module => ({ default: module.ResetPassword })));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const Project = lazy(() => import("./pages/Project"));

// Scroll to top on route change
const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

const AppContent = () => {
	const location = useLocation();
	const isBlogPage = location.pathname === "/blog";
	const isAuthPage = location.pathname.startsWith("/auth");
	const shouldHideNavbar = isBlogPage || isAuthPage;

	return (
		<div className="relative flex flex-col min-h-screen max-w-[4000px]">
			<ScrollToTop />
			{!shouldHideNavbar && (
				<div className="fixed top-0 z-30 w-full overflow-hidden">
					<Navbar />
				</div>
			)}
			<Suspense fallback={
				<div className="flex items-center justify-center min-h-screen">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
				</div>
			}>
				<div className="flex-grow">
					<Routes>
						<Route path="/auth" element={<Auth />}>
							<Route path="login" element={<Login />} />
							<Route path="register" element={<Register />} />
						</Route>
						<Route
							path="/auth/forgot-password"
							element={<ForgotPassword />}
						/>
						<Route
							path="/auth/reset-password"
							element={<ResetPassword />}
						/>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/projects" element={<Project />} />
					</Routes>
				</div>
			</Suspense>

			<div className="bg-transparent mt-auto">
				<Footer />
			</div>
		</div>
	);
};

const App = () => {
	return (
		<>
			<Router>
				<AppContent />
			</Router>
			<Toaster position="top-right" />
		</>
	);
};

export default App;