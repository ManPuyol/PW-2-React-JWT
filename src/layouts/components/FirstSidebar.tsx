import GlobalStyles from '@mui/joy/GlobalStyles';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
// icons
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LogoutIcon from '@mui/icons-material/Logout';

import MuiLogo from '../../assets/icons/MuiLogo';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/joy';

import { UserContext } from '../../hooks/userContext';
import {useContext} from 'react';

export default function FirstSidebar() {
  const { user } = useContext(UserContext) || {};

  return (
    <Sheet
      className="FirstSidebar"
      sx={{
        position: {
          xs: 'fixed',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          lg: 'none',
        },
        transition: 'transform 0.4s',
        zIndex: 10000,
        height: '100dvh',
        maxWidth: 'var(--FirstSidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={{
          ':root': {
            '--FirstSidebar-width': '68px',
          },
        }}
      />
      <MuiLogo />
      <List size="sm" sx={{ '--ListItem-radius': '6px', '--List-gap': '8px' }}>
        <ListItem>
          <Link to="/profile">
            <IconButton size="lg">
              <PeopleRoundedIcon />
            </IconButton>
          </Link>
        </ListItem>
        {user?.roles?.includes("ROLE_MODERATOR") && <ListItem>
          <Link to="/users">
            <IconButton size="lg">
              <ViewListIcon />
            </IconButton>
          </Link>
        </ListItem>}
        {user?.roles?.includes("ROLE_ADMIN") && <ListItem>
          <Link to="/management">
            <IconButton size="lg">
              <SettingsRoundedIcon />
            </IconButton>
          </Link>
        </ListItem>}
      </List>
      <List
        sx={{
          mt: 'auto',
          flexGrow: 0,
          '--ListItem-radius': '8px',
          '--List-gap': '4px',
        }}
      >
        <ListItem>
          <Link to="/sign-in">
            <IconButton size="lg">
              <LogoutIcon />
            </IconButton>
          </Link>
        </ListItem>
      </List>
    </Sheet>
  );
}
