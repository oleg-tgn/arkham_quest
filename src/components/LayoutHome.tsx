import { ReactNode } from 'react';
import { Layout } from './Layout';

type Props = {
  children: ReactNode;
};

export const LayoutHome = ({ children }: Props) => {
  return (
    <>
      <div className="w-[800px] h-[calc(100vh-100px)] flex flex-col gap-3">
        <Layout variant="book" heightClass="h-full overflow-auto">
          <Layout variant="content">{children}</Layout>
        </Layout>
      </div>
    </>
  );
};
