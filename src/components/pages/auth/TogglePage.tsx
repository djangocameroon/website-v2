import { NavLink, useLocation } from 'react-router-dom';

const TogglePage = () => {
     const { pathname } = useLocation();
  return (
    <div className='bg-white/10 px-2 py-2 rounded-full shadow-xl'>
      <div className='flex items-center rounded-full'>
        <NavLink
          to={'/auth/login'}
          className={`${
            pathname === '/auth/login'
              ? 'bg-white text-primary'
              : 'bg-transparent  text-white/50 '
          } py-2 rounded-full px-6 text-center  font-medium text-lg`}
        >
          Sign in
        </NavLink>
        <NavLink
          to={'/auth/register'}
          className={`${
            pathname === '/auth/register'
              ? 'bg-white text-primary'
              : 'bg-transparent  text-white/50 '
          } py-2 rounded-full px-6 text-center font-medium text-lg`}
        >
          Sign up
        </NavLink>
      </div>
    </div>
  );
}

export default TogglePage