import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip, { chipClasses } from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import DropZone from './DropZone';
import FileUpload from './FileUpload';
import CountrySelector from './CountrySelector';
import EditorToolbar from './EditorToolbar';
import { UserContext } from '../../../hooks/userContext';
import { FormEvent, useContext, useRef } from 'react';
import { changePassword } from '../../../utils/profile';

export default function MyProfile() {
  const { user } = useContext(UserContext) || {};
  const passwdForm = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement> | any): Promise<void> {
    event.preventDefault();
    const password = passwdForm.current?.elements['password']?.value;
    const rePassword = passwdForm.current?.elements['re_password']?.value;

    if (password != rePassword || password == '') return alert("Invalid passwords")

    try {
      const response = await changePassword( user?.email, password)
      if (response.status === 200) {
        alert("Password updated")
      } else {
        console.error(response.status);
      }
    } catch (error) {
      console.error('Error de red', error);
    }
  }

  return (
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
            Account settings
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
          <Box sx={{ display: { sm: 'contents' } }}>
            <FormControl sx={{ flex: 1 }}>
              <Input disabled placeholder="username" defaultValue={user?.username} />
            </FormControl>
          </Box>
          <Divider role="presentation" />
          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              startDecorator={<i data-feather="mail" />}
              disabled
              placeholder="email"
              defaultValue={user?.email}
            />
          </FormControl>
          <Divider role="presentation" />
          <div>
            <FormLabel>Roles</FormLabel>
          </div>
          <Box sx={{ display: { xs: 'flex', sm: 'flex' }, gap: 2 }}>
            {user?.roles?.map((role: 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN') => (
              <Chip
                variant="soft"
                color="primary"
                size="md"
                sx={{ borderRadius: 'sm' }}
                key={role}
              >
                {{
                  'ROLE_ADMIN': 'Admin',
                  'ROLE_MODERATOR': 'Moderator',
                  'ROLE_USER': 'User'
                }[role]}
              </Chip>
            ))}
          </Box>
          <Divider role="presentation" />

          <FormLabel sx={{ display: { xs: 'none', sm: 'block' } }}>
            Update Password
          </FormLabel>
          <form ref={passwdForm} onSubmit={handleSubmit}>
            <Box sx={{ display: { xs: 'contents', sm: 'flex' }, gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>New Password</FormLabel>
                <Input placeholder="Password" type="password" name="password" required/>
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Confirm Password</FormLabel>
                <Input placeholder="Confirm" type="password" name="re_password"/>
              </FormControl>
            </Box>
          </form>
          <Divider role="presentation" />
          <Box
            sx={{
              gridColumn: '1/-1',
              justifySelf: 'flex-end',
              display: 'flex',
              gap: 1,
            }}
          >
            <Button onClick={handleSubmit} size="sm">Change password</Button>
          </Box>
        </Box>
      </Tabs>
    </Box>
  );
}
