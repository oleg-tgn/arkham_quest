import { ReactNode } from 'react';
import { Typography } from './Typography';

type Props = {
  variant: 'primary' | 'secondary';
  children: ReactNode;
  onClick: () => void;
};

export const Button = ({ children, variant, onClick }: Props) => {
  console.log('Button', variant);
  return (
    <button
      className="w-90 px-4 py-6 my-2 bg-contain bg-[url('/img/button.png')] bg-no-repeat bg-cover bg-center brightness-90 hover:brightness-100 cursor-pointer"
      onClick={onClick}
    >
      <Typography variant="button">{children}</Typography>
    </button>
  );
};
