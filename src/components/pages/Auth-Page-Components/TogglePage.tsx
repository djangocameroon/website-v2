import { NavLink, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

const TogglePage = () => {
  const { pathname } = useLocation();

  const tabs = [
    { title: 'Sign in', path: '/auth/login' },
    { title: 'Sign up', path: '/auth/register' },
  ] as const;

  return (
    <div className='bg-white/10 p-2.5 rounded-full overflow-hidden shadow-xl'>
      <div className='flex items-center rounded-full'>
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={`py-2 rounded-full px-5 text-center font-medium text-xl urbanist-font ${pathname === tab.path
              ? 'text-primary'
              : 'bg-transparent text-white/50'
              }`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {pathname === tab.path && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className="absolute inset-0 bg-white rounded-[6.25rem] shadow-sm border-secondary border-[1.5px]"
              />
            )}
            <span className='relative block urbanist-font font-medium whitespace-nowrap'>{tab.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default TogglePage