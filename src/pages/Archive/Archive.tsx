import { LayoutHome } from 'components/LayoutHome';
import { Sessions } from 'components/Sessions';
import { Typography } from 'components/Typography';
import { NavLink } from 'react-router-dom';

export const Archive = () => {
  return (
    <LayoutHome>
      <NavLink to="/home">Назад</NavLink>
      <Typography variant="heading-1">Архив</Typography>
      <Sessions isFinished />
    </LayoutHome>
  );
};
