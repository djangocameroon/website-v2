import { lazy, Suspense, useEffect } from "react";
import { Footer, Navbar } from "./components/layout";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthRedirectWrapper } from "./pages/auth/Auth";

// Lazy load all page components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"))
const Auth = lazy(() => import("./pages/auth/Auth"));
const ForgotPassword = lazy(() => import("./pages/auth/forgot-password").then(module => ({ default: module.ForgotPassword })));
const ResetPassword = lazy(() => import("./pages/auth/forgot-password").then(module => ({ default: module.ResetPassword })));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const Project = lazy(() => import("./pages/Project"));
const BlogAdd = lazy(() => import("./pages/blog/BlogAdd"));
const BlogDetail = lazy(() => import("./pages/blog/BlogDetails"));

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
	const isAuthPage = location.pathname.startsWith("/auth");

	return (
		<div className="relative flex flex-col min-h-screen max-w-[4000px]">
			<ScrollToTop />
			{!isAuthPage && (
				<div className="fixed top-0 z-30 w-full overflow-hidden">
					<Navbar />
				</div>
			)}
			<Suspense fallback={
				<div className="flex items-center justify-center min-h-screen">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
				</div>
			}>
				{!isAuthPage && (
					<div className="fixed top-0 z-30 w-full overflow-hidden">
						<Navbar />
					</div>
				)}
				<div className="flex-grow">
					<Routes>
						<Route path="/auth" element={
							<AuthRedirectWrapper>
								<Auth />
							</AuthRedirectWrapper>
						}>
							<Route path="login" element={<Login />} />
							<Route path="register" element={<Register />} />
							<Route
								path="verify-email"
								element={<VerifyEmail />}
							/>
							<Route
								path="forgot-password"
								element={<ForgotPassword />}
							/>
							<Route
								path="reset-password"
								element={<ResetPassword />}
							/>
						</Route>


						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/blog/new" element={<BlogAdd />} />
						<Route path="/blog/:id" element={<BlogDetail />} />
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
			<Toaster 
                position="bottom-right"
                toastOptions={{
                    // Default styles for all toasts
                    style: {
                        background: 'rgba(10, 14, 39, 0.95)',
                        color: '#fff',
                        border: '1px solid rgba(66, 133, 244, 0.3)',
                        borderRadius: '1rem',
                        fontFamily: 'urbanist, sans-serif',
                        backdropFilter: 'blur(10px)',
                    },
                    // Duration
                    duration: 4000,
                    // Success toast
                    success: {
						duration: 2500,
                        style: {
                            background: 'rgba(16, 62, 46, 0.95)',
                            border: '1px solid rgba(34, 197, 94, 0.5)',
                        },
                        iconTheme: {
                            primary: 'rgb(15, 157, 88)',
                            secondary: '#fff',
                        },
                    },
                    // Error toast
                    error: {
						duration: 5000,
                        style: {
                            background: 'rgba(39, 10, 10, 0.95)',
                            border: '1px solid rgba(239, 68, 68, 0.5)',
                        },
                        iconTheme: {
                            primary: 'rgb(219, 68, 55)',
                            secondary: '#fff',
                        },
                    },
                    // Loading toast
                    loading: {
                        style: {
                            background: 'rgba(10, 14, 39, 0.95)',
                            border: '1px solid rgba(66, 133, 244, 0.5)',
                        },
                    },
                }}
            />
		</>
	);
};

export default App;