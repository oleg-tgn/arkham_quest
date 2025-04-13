import { ReactNode, forwardRef } from 'react';

type Props = {
  children: ReactNode;
  heightClass?: string;
  variant: 'book' | 'content' | 'form' | 'addressLine';
};

export const Layout = forwardRef<HTMLDivElement, Props>(
  ({ children, heightClass = '', variant }, ref) => {
    const variantClasses: Record<string, string> = {
      book: 'arkhem-book-bg flex flex-col rounded-lg overflow-y-auto',
      content: 'flex-grow p-10',
      form: 'flex flex-wrap h-full gap-2 items-center px-10',
      addressLine: 'flex justify-between mt-1 pb-1 border-b border-gray-300/50',
    };

    return (
      <div ref={ref} className={`${variantClasses[variant]} ${heightClass}`}>
        {children}
      </div>
    );
  },
);

Layout.displayName = 'Layout';
