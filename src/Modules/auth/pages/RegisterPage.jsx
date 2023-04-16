import { Google } from '@mui/icons-material'
import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material'

import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../../hooks/useForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../../store/auth/thunks';
import { useMemo } from 'react';

const formDate = {
  email: 'cristian@gmail.com',
  password: '',
  displayName: 'Cristian chipana'
}

const formValidations = {
  email: [( value ) => value.includes('@') , 'El correo debe tener un @'],
  password: [( value ) => value.length >= 6 , 'El password debe tener mas de 6 letras'],
  displayName: [( value ) => value.length >= 1 , 'El Nombre es obligatorio'],
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false)
  const dispatch = useDispatch()

  const { status, errorMessage } =  useSelector( state => state.auth );

  const isCheckingAuthentication = useMemo( () => status == 'checking', [status]  )

  const { 
    displayName, email, password, formState, onInputChange,
    displayNameValid, emailValid, passwordValid, isFormValid
  } = useForm(formDate, formValidations)


  console.log(displayNameValid);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    dispatch(startCreatingUserWithEmailPassword(formState))
    console.log(formState);
  }


  return (

      <AuthLayout title={"Crear Cuenta"}>

        <h2>  Formulario valido: { isFormValid ? 'Valido' : 'Incorrecto' } </h2>

        <form onSubmit={onSubmit}>
          <Grid
            container
          >
             <Grid item xs={12}  sx={{ mt: 2 }}>
                <TextField
                  label = "Nombre completo"
                  type='yexy'
                  placeholder='Nombre completo'
                  fullWidth
                  name='displayName'
                  value={ displayName }
                  onChange={ onInputChange }
                  error= { !!displayNameValid  && formSubmitted}
                  helperText= { displayNameValid }
                ></TextField>
              </Grid>

            <Grid item xs={12}  sx={{ mt: 2 }}>
              <TextField
                label = "Correo"
                type='email'
                placeholder='Correo@dd.com'
                fullWidth
                name='email'
                value={ email }
                onChange={ onInputChange }
                error= { !!emailValid && formSubmitted}
                helperText= { emailValid }
              ></TextField>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label = "Contraseña"
                type='password'
                placeholder='contraseña'
                fullWidth
                name='password'
                value={ password }
                onChange={ onInputChange }
                error= { !!passwordValid && formSubmitted }
                helperText= { passwordValid }
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

              <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
                <Button disabled={ isCheckingAuthentication } type='submit' variant='contained' fullWidth>
                  Crear Cuenta
                </Button>
              </Grid>

              <Grid container 
                direction={'row'}
                justifyContent={'end'}
              >
                <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
                <Link component={RouterLink} color={'inherit'} to='/auth/login' >
                  Iniciar sesion
                </Link>
              </Grid>

            </Grid>

          </Grid>
        </form>
      </AuthLayout>

  )
}
