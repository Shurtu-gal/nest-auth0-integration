import Box from '@mui/material/Box';

import {
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from 'react-admin';
import { CatchingPokemon } from '@mui/icons-material';

const Menu = ({ dense = false }: MenuProps) => {
  const [open] = useSidebarState();

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />
      <MenuItemLink
        to={`/cats`}
        primaryText={'Cats'}
        leftIcon={<CatchingPokemon />}
        sidebarIsOpen={open}
        dense={dense}
      />
    </Box>
  );
};

export default Menu;
