import { NavLink, useLocation } from 'react-router-dom';

const TogglePage = () => {
     const { pathname } = useLocation();
  return (
    <div className='bg-white/10 p-2.5 rounded-full overflow-hidden shadow-xl'>
      <div className='flex items-center rounded-full'>
        <NavLink
          to={'/auth/login'}
          className={`${
            pathname === '/auth/login'
              ? 'bg-white text-primary border-secondary border-[1.5px]'
              : 'bg-transparent text-white/50'
          } py-2 rounded-full px-5 text-center  font-medium text-xl urbanist-font`}
        >
          Sign in
        </NavLink>
        <NavLink
          to={'/auth/register'}
          className={`${
            pathname === '/auth/register'
              ? 'bg-white text-primary border-secondary border-[1.5px]'
              : 'bg-transparent  text-white/50 '
          } py-2 rounded-full px-5 text-center font-medium text-xl urbanist-font`}
        >
          Sign up
        </NavLink>
      </div>
    </div>
  );
}

export default TogglePage