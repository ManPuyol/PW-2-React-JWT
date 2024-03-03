import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import OuterLayout from '../../layouts/OuterLayout';
import GoogleIcon from '../../assets/icons/GoogleIcons';
import { useNavigate  } from "react-router-dom";
import Box from "@mui/joy/Box";
import Box from "@mui/joy/Box";
import Box from "@mui/joy/Box";
import Box from "@mui/joy/Box";
import Box from "@mui/joy/Box";
import Box from "@mui/joy/Box";
import Box from "@mui/joy/Box";
import Box from "@mui/joy/Box";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Button from "@mui/joy/Button";
import Button from "@mui/joy/Button";
import Button from "@mui/joy/Button";
import Button from "@mui/joy/Button";
import Button from "@mui/joy/Button";
import Button from "@mui/joy/Button";
import Button from "@mui/joy/Button";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormControl from "@mui/joy/FormControl";
import FormControl from "@mui/joy/FormControl";
import FormControl from "@mui/joy/FormControl";
import FormControl from "@mui/joy/FormControl";
import FormControl from "@mui/joy/FormControl";
import FormControl from "@mui/joy/FormControl";
import FormControl from "@mui/joy/FormControl";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormLabel from "@mui/joy/FormLabel";
import FormLabel from "@mui/joy/FormLabel";
import FormLabel from "@mui/joy/FormLabel";
import FormLabel from "@mui/joy/FormLabel";
import FormLabel from "@mui/joy/FormLabel";
import FormLabel from "@mui/joy/FormLabel";
import FormLabel from "@mui/joy/FormLabel";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Input from "@mui/joy/Input";
import Input from "@mui/joy/Input";
import Input from "@mui/joy/Input";
import Input from "@mui/joy/Input";
import Input from "@mui/joy/Input";
import Input from "@mui/joy/Input";
import Input from "@mui/joy/Input";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Link from "@mui/joy/Link";
import Link from "@mui/joy/Link";
import Link from "@mui/joy/Link";
import Link from "@mui/joy/Link";
import Link from "@mui/joy/Link";
import Link from "@mui/joy/Link";
import Link from "@mui/joy/Link";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import axios from "axios";
import axios from "axios";
import axios from "axios";
import axios from "axios";
import axios from "axios";
import axios from "axios";
import axios from "axios";
import axios from "axios";
import * as React from "react";
import * as React from "react";
import * as React from "react";
import * as React from "react";
import * as React from "react";
import * as React from "react";
import * as React from "react";
import * as React from "react";
import * as React from "react";
import { SignInFormElement } from ".";
import { SignInFormElement } from ".";
import { SignInFormElement } from ".";
import { SignInFormElement } from ".";
import { SignInFormElement } from ".";
import { SignInFormElement } from ".";
import { SignInFormElement } from ".";
import { SignInFormElement } from ".";
import { SignInFormElement } from ".";
import OuterLayout from "../../layouts/OuterLayout";
import OuterLayout from "../../layouts/OuterLayout";
import OuterLayout from "../../layouts/OuterLayout";
import OuterLayout from "../../layouts/OuterLayout";
import OuterLayout from "../../layouts/OuterLayout";
import OuterLayout from "../../layouts/OuterLayout";
import OuterLayout from "../../layouts/OuterLayout";
import OuterLayout from "../../layouts/OuterLayout";
import OuterLayout from "../../layouts/OuterLayout";
import OuterLayout from '../../layouts/OuterLayout';
import { SignInFormElement } from '../Login';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirm: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Register() {

  const navigate = useNavigate();

  // SACAR ESTA FUNCION DE ACA Y DE LOGIN/INDEX.TSX Y SACAR A OTRO ARCHIVO!!
  const login = async (username: string, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.status === 200) {
      navigate("/dashboard/profile");
    } else {
      console.error('Error de inicio de sesión');
    }
  }

  const register = async (username: string, email: string,  password: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
				username,
				email,
				password,
				"roles": [
					"user"
				]
			}),
    });
  
    if (response.status === 200) {
      alert('Registrado');
      await login(username, password);
    } else {
      console.error('Error de inicio de sesión');
    }
  }

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;

    try {
      await register(username, email, password);
    } catch (error) {
      console.error('Error de red', error);
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
export default function Login() {

  const navigate = useNavigate();

  const login = async (username: string, password: string) => {

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,
      { username, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      navigate("/profile");
    } else {
      console.error('Error de inicio de sesión');
    }
  };

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    try {
      await login(username, password);
    } catch (error) {
      console.error('Error de red', error);
    }
  };

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
            Sign in to your account
          </Typography>
          <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
            Welcome back
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
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password" />
          </FormControl>
          <Button type="submit" fullWidth color="primary">
            Log in
          </Button>
        </form>
        <Link fontSize="sm" href="/sign-up" fontWeight="lg" mr="auto">
          Crear una cuenta
        </Link>
      </Box>
      <Box component="footer" sx={{ py: 3 }}>
        <Typography level="body-xs" textAlign="center">
          © Your company {new Date().getFullYear()}
        </Typography>
      </Box>
    </OuterLayout>
  );
}
