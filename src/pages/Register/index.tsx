import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import OuterLayout from '../../layouts/OuterLayout';
import { useNavigate  } from "react-router-dom";
import { handleToken, login, register } from '../../utils/auth';
import { UserContext } from '../../hooks/userContext';

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirm: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Register() {

  const navigate = useNavigate();
  const { setUser } = React.useContext(UserContext) || {};


  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements as FormElements;

    const username = (formElements.username as HTMLInputElement).value;
    const email = (formElements.email as HTMLInputElement).value;
    const password = (formElements.password as HTMLInputElement).value;

    try {
      const registrationResponse = await register(username, email, password);
      if (registrationResponse.status !== 200) {
        console.error('Registration failed');
        return;
      }
  
      alert('Successfully registered');
  
      const loginResponse = await login(username, password);
  
      if (loginResponse.status !== 200) {
        console.error('Login failed');
        return;
      }
      navigate("/profile");
      handleToken(loginResponse);
      if (setUser) {
        setUser({
          id: loginResponse.data.id,
          username: loginResponse.data.username,
          email: loginResponse.data.email,
          roles: loginResponse.data.roles
        });
      }
    } catch (error) {
      console.error('Network error', error);
    }
  }

  return (
    <OuterLayout>
      <Box
        component="main"
        sx={{
          my: 'auto',
          py: 2,
          pb: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 400,
          maxWidth: '100%',
          mx: 'auto',
          borderRadius: 'sm',
          '& form': {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          },
          [`& .${formLabelClasses.asterisk}`]: {
            visibility: 'hidden',
          },
        }}
      >
        <div>
          <Typography component="h1" fontSize="xl2" fontWeight="lg">
            Create a new account
          </Typography>
          <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
            Welcome to company
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit}
        >
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" name="username" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirm"
            />
          </FormControl>

          <Button type="submit" fullWidth color="primary">
            Sign up
          </Button>
        </form>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link fontSize="sm" href="/sign-in" fontWeight="lg" mr="auto">
            Tengo una cuenta
          </Link>
        </Box>
      </Box>

      <Box component="footer" sx={{ py: 3 }}>
        <Typography level="body-xs" textAlign="center">
          © Your company {new Date().getFullYear()}
        </Typography>
      </Box>
    </OuterLayout>
  );
}