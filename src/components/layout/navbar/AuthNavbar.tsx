import { Link } from 'react-router-dom'
import { AuthImages } from '@/assets'

const AuthNavbar = () => {
  return (
    <div className='bg-transparent pt-[3.125rem] pb-[3.9rem]'>
      <Link to={"/"}>
        <img
          src={AuthImages.whiteLogo}
          alt='logo'
          className='md:cursor-pointer h-[3.66rem] mx-auto'
        />
      </Link>
        
    </div>
  )
}

export default AuthNavbar