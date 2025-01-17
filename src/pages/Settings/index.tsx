import InnerLayout from '../../layouts/InnerLayout';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { chipClasses } from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { Option, Select } from '@mui/joy';
import Checkbox from '@mui/joy/Checkbox';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { getUsers } from '../../utils/users';
import { changeRoles } from '../../utils/manageRoles';
import { UserContext } from '../../hooks/userContext';

export default function Settings() {
  const { user } = useContext(UserContext) || {};

  const [users, setUsers] = useState<any[]>([]);
  const [isAdmin, setAdmin] = useState(false);
  const [isModerator, setModerator] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | number >("");

  useEffect(() => {
    (async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    })()
  }, [])

  useEffect(() => {
    if (isAdmin) {
      setModerator(true);
    }
  }, [isAdmin]);

  const handleChange = (event, value) => {
    setSelectedUser(value);
  };

  async function handleSubmit(): Promise<void> {
		const roles = ["user"]
		if (isModerator) roles.push("moderator")
		if (isAdmin) roles.push("admin")

    try {
			const response = await changeRoles(selectedUser, roles)
			if (response.status === 200) {
				alert("User roles updated")
			} else {
				console.error(response.status);
			}
    } catch (error) {
      console.error('Error de red', error);
    }
  }

  return (
    <InnerLayout>
      <Box
        sx={{
          flex: 1,
          width: '100%',
          mx: 'auto',
        }}
      >
        <Tabs defaultValue={0} sx={{ bgcolor: 'transparent' }}>
          <Box
            sx={{
              '--_shadow-height': '16px',
              height: 0,
              position: 'sticky',
              top: 'calc(48px - var(--main-paddingTop, 0px) + var(--Header-height, 0px) - (var(--_shadow-height) / 2))',
              zIndex: 1,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                height: 'var(--_shadow-height)',
                background:
                  'radial-gradient(closest-side, rgba(0 0 0 / 0.12), transparent 100%)',
              },
            }}
          />
          <TabList
            sticky="top"
            variant="plain"
            sx={(theme) => ({
              '--Chip-minHeight': '20px',
              '--ListItem-minHeight': '48px',
              top: 'calc(-1 * (var(--main-paddingTop, 0px) - var(--Header-height, 0px)))',
              zIndex: 10,
              width: '100%',
              overflow: 'auto hidden',
              alignSelf: 'flex-start',
              scrollSnapType: 'inline',
              '&::after': {
                pointerEvents: 'none',
                display: { xs: 'block', sm: 'none' },
                content: '""',
                position: 'sticky',
                top: 0,
                width: 40,
                flex: 'none',
                zIndex: 1,
                right: 0,
                borderBottom: '1px solid transparent',
                background: `linear-gradient(to left, ${theme.vars.palette.background.body}, rgb(0 0 0 / 0))`,
                backgroundClip: 'content-box',
              },
              '&::-webkit-scrollbar': {
                width: 0,
                display: 'none',
              },
              [`& .${tabClasses.root}`]: {
                '--focus-outline-offset': '-2px',
                '&:first-of-type': {
                  ml: 'calc(-1 * var(--ListItem-paddingX))',
                },
                scrollSnapAlign: 'start',
                bgcolor: 'transparent',
                flex: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                },
                [`&.${tabClasses.selected}`]: {
                  color: 'primary.plainColor',
                  bgcolor: 'transparent',
                  [`& .${chipClasses.root}`]: theme.variants.solid.primary,
                },
              },
            })}
          >
            <Tab indicatorInset value={0}>
              Roles
            </Tab>
          </TabList>
          <Box
            sx={{
              pt: 3,
              pb: 10,
              display: 'grid',
              gridTemplateColumns: {
                xs: '100%',
                sm: 'minmax(120px, 30%) 1fr',
                lg: '280px 1fr minmax(120px, 208px)',
              },
              columnGap: { xs: 2, sm: 3, md: 4 },
              rowGap: { xs: 2, sm: 2.5 },
              '& > hr': {
                gridColumn: '1/-1',
              },
            }}
          >
            <FormLabel sx={{ display: { xs: 'none', sm: 'block' } }}>
              Username
            </FormLabel>
            <Box sx={{ display: { xs: 'contents', sm: 'flex' }, gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel sx={{ display: { sm: 'none' } }}>Users</FormLabel>
                <Select name="user" placeholder="User" onChange={handleChange}>
                  {users.map((user) => (
                    <Option value={user.id}>{user.username}</Option>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Divider role="presentation" />
            <FormLabel sx={{ display: { xs: 'none', sm: 'block' } }}>
              Roles
            </FormLabel>
            <Box sx={{ display: { xs: 'contents', sm: 'flex' }, gap: 2 }}>
              <Checkbox
                checked={isModerator}
                onChange={(event) => setModerator(event.target.checked)}
                name='moderator'
                size="sm"
                sx={{ verticalAlign: 'text-bottom' }}
                label="Moderator"
                />
              <Checkbox
                checked={isAdmin}
                onChange={(event) => setAdmin(event.target.checked)}
                name='admin'
                size="sm"
                sx={{ verticalAlign: 'text-bottom' }}
                label="Admin"
              />
            </Box>
            <Divider role="presentation" />
            <Box
              sx={{
                gridColumn: '1/-1',
                justifySelf: 'flex-start',
                display: 'flex',
                gap: 1,
              }}
            >
              <Button variant="outlined" color="neutral" size="sm">
                Cancel
              </Button>
              <Button onClick={handleSubmit} size="sm">Save</Button>
            </Box>
          </Box>
        </Tabs>
      </Box>
    </InnerLayout>
  );
}
