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
      } capitalize  py-2 px-5 rounded-lg whitespace-nowrap  text-white md:text-lg font-semibold ${backgroundColor} `}
    >
      {children}
    </button>
  );
};

export default Button