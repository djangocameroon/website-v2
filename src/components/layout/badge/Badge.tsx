import { ReactNode } from 'react';


interface BadgeProps {
  backgroundColor?: string;
  children: ReactNode;
}


const Badge = ({children}:BadgeProps) => {
  return (
    <div className='bg-secondary/20 flex justify-center items-center rounded-full text-secondary text-lg py-1 px-5'>
     {children}
    </div>
  );
}

export default Badge