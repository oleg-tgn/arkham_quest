import { LayoutHome } from 'components/LayoutHome';
import { Sessions } from 'components/Sessions';
import { Typography } from 'components/Typography';
import { NavLink } from 'react-router-dom';

export const Continue = () => {
  return (
    <LayoutHome>
      <NavLink to="/home">Назад</NavLink>
      <Typography variant="heading-1">Продолжить игру</Typography>
      <Sessions />
    </LayoutHome>
  );
};
