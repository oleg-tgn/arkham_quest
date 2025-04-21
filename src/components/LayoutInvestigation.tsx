import { ReactNode } from 'react';
import { Menu } from './Menu';

type Props = {
  children: ReactNode;
};

export const LayoutInvestigation = ({ children }: Props) => {
  return (
    <>
      <div className="w-50">
        <Menu />
      </div>
      <div className="w-[800px] h-[calc(100vh-100px)] flex flex-col gap-3">{children}</div>
      <div className="w-50"></div>
    </>
  );
};
