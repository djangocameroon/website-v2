
import { Outlet } from 'react-router-dom';
import { TogglePage } from '../../components/pages/Auth-Page-Components';
import { AuthImages } from '../../assets';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <div className='bg-primary px-5 flex flex-col md:gap-2 justify-start h-screen items-center  overflow-auto'>
      <Link to={'/'} className='mt-6 md:mt-16 w-40'>
        <img src={AuthImages.whiteLogo} alt="" />
      </Link>
      <div className='mt-5 md:mb-10'>
        <TogglePage/>
      </div>

      <Outlet/>

    </div>

  )
}

export default Auth