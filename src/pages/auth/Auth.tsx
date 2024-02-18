
import { Outlet } from 'react-router-dom';
import { TogglePage } from '../../components/pages/Auth-Page-Components';
import { AuthImages } from '../../assets';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <div className='green-backbg-auth px-5 py-10 bg-no-repeat bg-cover h-screen bg-center flex flex-col justify-start items-center'>
      <Link to={'/'} className='pb-4 w-40'>
        <img src={AuthImages.whiteLogo} alt="" />
      </Link>
      <div className='overflow-hidden'>
        <TogglePage/>
      </div>
      <Outlet/>

    </div>

  )
}

export default Auth