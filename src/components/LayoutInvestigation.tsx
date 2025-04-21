import { ReactNode } from 'react';
import { Menu } from './Menu';
import { Layout } from './Layout';

type Props = {
  children: ReactNode;
  formSection?: ReactNode;
};

export const LayoutInvestigation = ({ children, formSection }: Props) => {
  return (
    <>
      <div className="w-50">
        <Menu />
      </div>
      <div className="w-[800px] h-[calc(100vh-100px)] flex flex-col gap-3">
        <Layout variant="book" heightClass="h-full">
          <Layout variant="content">{children}</Layout>
        </Layout>

        {formSection ? (
          <Layout variant="book" heightClass="h-[80px]">
            <Layout variant="form">{formSection}</Layout>
          </Layout>
        ) : null}
      </div>
      <div className="w-50"></div>
    </>
  );
};
