import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AuthContextt from '../../store/AuthContextt';
import axios from 'axios';
import { useEffect } from 'react';

const defaultTheme = createTheme();

export default function LoginUserPage() {

    const navigate = useNavigate();
    useEffect(()=>{
      const token = localStorage.getItem("token");
      if(token){
        navigate("/user/expense");
      }
    },[])

  const AuthCtx = React.useContext(AuthContextt);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const emailHandler = (event) => {
    setUser((prevState) => {
      return {
        ...prevState,
        email: event.target.value,
      };
    });
  };

  const passwordHandler = (event) => {
    setUser((prevState) => {
      return {
        ...prevState,
        password: event.target.value,
      };
    });
  };


  const handleSubmit = async (event) => {
    try {
        event.preventDefault();
        const res = await axios.post("http://localhost:4000/user/login", user, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        AuthCtx.setisLoggedIn(true);
        localStorage.setItem("user", res.data.user.user_id);
        localStorage.setItem("token", res.data.token);
        navigate("/user/expense/");
        console.log(res.data.message);
      } catch (err) {
        console.log(err.message);
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={emailHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}