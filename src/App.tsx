import { Footer, Navbar } from './components/layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'


const App = () => {
  return (
    <Router >
      <div className='relative'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>

        <div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App