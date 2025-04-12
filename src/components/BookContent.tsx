import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const BookContent = ({ children }: Props) => {
  return (
    <div className="bg-[#f8f5e4] shadow-lg rounded-lg p-10 font-serif text-gray-800 leading-relaxed overflow-y-auto h-[calc(100vh-175px)]">
      {children}
    </div>
  );
};
