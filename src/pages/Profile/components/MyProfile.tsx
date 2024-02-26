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

export default function MyProfile() {


  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
      }}
    >
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
          <Box sx={{ display: { sm: 'contents' }}}>
            <FormControl sx={{ flex: 1 }}>
              <Input placeholder="username" defaultValue="Siriwat" />
            </FormControl>
          </Box>
          <Divider role="presentation" />
          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              //startDecorator={<i data-feather="mail" />}
              placeholder="email"
              defaultValue="siriwatk@test.com"
            />
          </FormControl>
          

          <Divider role="presentation" />
          <FormControl sx={{ display: { sm: 'contents' } }}>
            <FormLabel>Role</FormLabel>
            <Input defaultValue="UI Developer" />
          </FormControl>
          <Divider role="presentation" />
          {/* <CountrySelector />
          <Divider role="presentation" /> */}
          <div>
            <FormLabel>Change password</FormLabel>
          </div>
          <div>
            <FormControl sx={{ flex: 1 , marginBottom: 2 }}>
              <FormLabel >New password</FormLabel>
              <Input type='password' placeholder="first name" />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel >Confirm password</FormLabel>
              <Input type='password' placeholder="last name"  />
            </FormControl>
          </div>
          <Divider role="presentation" />

          <Box
            sx={{
              gridColumn: '1/-1',
              justifySelf: 'flex-end',
              display: 'flex',
              gap: 1,
            }}
          >
            <Button variant="outlined" color="neutral" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </Box>
        </Box>
    </Box>
  );
}
