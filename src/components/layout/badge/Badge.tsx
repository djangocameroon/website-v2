import { ReactNode } from 'react';


interface BadgeProps {
  backgroundColor?: string;
  outline?: boolean;
  children: ReactNode;
}


const Badge = ({children, outline}:BadgeProps) => {
  return (
    <button
      className={`${
        outline === true && 'border-secondary border-2'
      } cursor-pointer bg-secondary/20 flex justify-center items-center rounded-full text-secondary text-sm py-1 px-5`}
    >
      {children}
    </button>
  );
}

export default Badge