import { Footer, Navbar } from './components/layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Auth from './pages/auth/Auth';
import { ForgotPassword, ResetPassword } from './pages/auth/forgot-password';




const App = () => {



  return (
    <Router>
      <div className='relative h-full'>
        <div className='fixed top-0 z-30 w-full mb-20'>
          <Navbar />
        </div>
        <Routes>
          <Route path='/auth' element={<Auth />}>
            <Route path='login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
          </Route>
          <Route path='/auth/forgot-password' element={<ForgotPassword />} />
          <Route path='/auth/reset-password' element={<ResetPassword />} />
          <Route path='/' element={<Home />} />

          
        </Routes>

        <div className='bg-transparent'>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App