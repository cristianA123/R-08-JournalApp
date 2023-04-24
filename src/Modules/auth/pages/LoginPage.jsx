import { Google } from '@mui/icons-material'
import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material'

import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../../store/auth/thunks';
import { useMemo } from 'react';


const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const {status, errorMessage} = useSelector( state => state.auth )

  const dispatch = useDispatch()
  
  const { email, password, onInputChange } = useForm(formData)

  const isAuthenticating =  useMemo(() => status=== 'checking', [status])

  const onSumbit = (event) => {
    event.preventDefault();
    console.log({ email, password });

    dispatch(startLoginWithEmailPassword({ email, password }))

  }

  const onGoogleSingIn = (event) => {
    event.preventDefault();
    dispatch(startGoogleSignIn())
    console.log('onGoogleSingIn');

  }

  return (

    <AuthLayout title={"Login"}>
      <form onSubmit={onSumbit}>
        <Grid
          container
        >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type='email'
              placeholder='Correo@dd.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type='password'
              placeholder='contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid 
                item 
                xs={12} 
                sm={12} 
                sx={{ mt: 2 }}
                display={ !!errorMessage ? '' : 'none' }
              >
                <Alert
                  severity='error'
                >{ errorMessage }
                </Alert>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
              <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
              <Button disabled={isAuthenticating} variant='contained' fullWidth onClick={onGoogleSingIn}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

            <Grid container
              direction={'row'}
              justifyContent={'end'}
            >
              <Link component={RouterLink} color={'inherit'} to='/auth/register' >
                Crear cuenta
              </Link>
            </Grid>

          </Grid>

        </Grid>
      </form>
    </AuthLayout>

  )
}
