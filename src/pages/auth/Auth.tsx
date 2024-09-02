
import { Outlet } from 'react-router-dom';
import { TogglePage } from '../../components/pages/Auth-Page-Components';
import { AuthFooter, AuthNavbar } from '../../components/layout';

const Auth = () => {
  return (
    <div className='green-backbg md:px-5 flex flex-col md:gap-2 justify-start h-screen items-center  overflow-auto'>
      <AuthNavbar />
      <div className='md:mb-[4.625rem] mb-10'>
        <TogglePage/>
      </div>

      <Outlet/>

      <div className="mt-[6.75rem] w-full">
        <AuthFooter /> 
      </div>

    </div>

  )
}

export default Auth