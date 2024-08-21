import { ReactNode } from 'react';
import { cn } from '../../../utils/constants';


interface BadgeProps {
  backgroundColor?: string;
  outline?: boolean;
  children: ReactNode;
  className?: string;
}


const Badge = ({children, outline, backgroundColor="bg-secondary/20", className=''}:BadgeProps) => {
  return (
    <button
      className={cn(
        'flex justify-center items-center rounded-full text-secondary urbanist-font text-sm py-2 px-4 cursor-pointer',
        backgroundColor,
        className,
        {
          'border-secondary border-2': outline
        }
      )}
      // className={`${
      //   outline === true && 'border-secondary border-2'
      // } cursor-pointer bg-secondary/20 flex justify-center items-center rounded-full text-secondary urbanist-font text-sm py-2 px-4`}
    >
      {children}
    </button>
  );
}

export default Badge