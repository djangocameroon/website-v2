import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';


const BaseLayout = () => {
  return (
    <div>
      <Navbar />
      <main className=''>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout