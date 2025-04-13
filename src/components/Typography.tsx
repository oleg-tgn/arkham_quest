import { ReactNode } from 'react';

type TypographyVariant = 'heading-1' | 'heading-2' | 'text' | 'text-small';

type Props = {
  children: ReactNode;
  variant: TypographyVariant;
};

export const Typography = ({ children, variant }: Props) => {
  const classes: Record<TypographyVariant, string> = {
    'heading-1': 'text-2xl font-bold text-[#3b3b3b] my-2',
    'heading-2': 'text-lg font-bold text-[#3b3b3b] my-2',
    text: 'text-gray-800',
    'text-small': 'text-gray-800 text-sm',
  };
  return <div className={`font-serif ${classes[variant]}`}>{children}</div>;
};
