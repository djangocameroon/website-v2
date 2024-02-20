import { ReactNode } from 'react';

interface ButtonProps {
  backgroundColor?: string;
  children: ReactNode;
  onClick?: () => void;
  outline: boolean;
}

const Button = ({ outline, children,backgroundColor }: ButtonProps) => {
  return (
    <button
      className={` ${
        outline === true ? 'btn-outline' : ''
      } capitalize  py-2 my-4 px-5 rounded-lg whitespace-nowrap transition-all hover:-translate-y-2  text-white md:text-lg font-semibold ${backgroundColor} `}
    >
      {children}
    </button>
  );
};

export default Button