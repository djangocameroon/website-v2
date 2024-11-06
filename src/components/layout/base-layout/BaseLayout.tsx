import Navbar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/footer/Footer';
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