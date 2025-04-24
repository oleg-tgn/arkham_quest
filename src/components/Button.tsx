import { ReactNode } from 'react';

type Props = {
  variant: 'primary' | 'secondary' | 'story';
  children: ReactNode;
  onClick: () => void;
};

export const Button = ({ children, variant, onClick }: Props) => {
  const classes: Record<string, string> = {
    primary:
      'w-90 px-4 py-6 my-2 bg-contain bg-[url("/img/button.png")] bg-no-repeat bg-cover bg-center brightness-85 hover:brightness-100 cursor-pointer text-white text-xl font-roboto',
    secondary: '',
    story:
      'w-full px-4 py-2 my-2 border-b-2 border-black/50 hover:border-black cursor-pointer text-left text-xl text-black',
  };
  return (
    <button className={classes[variant]} onClick={onClick}>
      {children}
    </button>
  );
};
