import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logos/logo.png';

import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Grid,
  Link,
  Box,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Customize your primary color
      },
      secondary: {
        main: '#dc004e', // Customize your secondary color
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

const SignIn = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Simulate authentication
    if (email === 'identifiant' && password === '123') {
      // Redirigez vers le tableau de bord après la connexion réussie
      navigate('/starter');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <img
    src={logo}
    alt="Logo"
    style={{ width: '70%', height: '70%', objectFit: 'contain' }}
  />
          <Typography component="h1" variant="h5">
            Se Connecter
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
  margin="normal"
  required
  fullWidth
  id="email"
  label="Identifiant"
  name="email"
  autoComplete="email"
  autoFocus
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black', // Default border color
      },
      '&:hover fieldset': {
        borderColor: 'black', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', // Border color when focused
      },
    },
  }}
/>

<TextField
  margin="normal"
  required
  fullWidth
  name="password"
  label="Mot de passe"
  type="password"
  id="password"
  autoComplete="current-password"
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black', // Default border color
      },
      '&:hover fieldset': {
        borderColor: 'black', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', // Border color when focused
      },
    },
  }}
/>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#B2171A',
                '&:hover': {
                  backgroundColor: '#9E151A', // Darker shade for hover effect
                },
              }}
            >
              Se Connecter
            </Button>
            <Grid container >
  <Grid item xs>
    <Link href="#" variant="body2" sx={{ color: 'black' }}>
      Mot de passe oublié?
    </Link>
  </Grid>
  
</Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
