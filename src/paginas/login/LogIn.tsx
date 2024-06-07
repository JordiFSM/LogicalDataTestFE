import { Alert, TextField, Typography, Box, Button, Container, Grid } from '@mui/material';
import './LogIn.css';

import { ModalCargando } from '../../componentes/ModalCargando/ModalCargando';
import { Navigate } from "react-router-dom"
import { usePaginaLogIn } from './store';
import * as Iconos from '@mui/icons-material';

import * as Constantes from "../../constantes/Constantes";
import { SIniciarSesion } from './modelos/solicitudes/sIniciarSesion';


/**
 * Autor: Jordi Segura
 * Fecha: 6/6/2024
 * Descripción: Componente del Login.
 * @returns Componente de la página de Login.
 */
export const LogIn = () => {
  const alertErrorLogIn = usePaginaLogIn((state) => state.alertErrorLogin);
  const nombreUsuario = usePaginaLogIn((state) => state.nombreUsuario);
  const contraseniaUsuario = usePaginaLogIn((state) => state.contraseniaUsuario);
  const usuarioAutenticado = usePaginaLogIn((state) => state.usuarioAutenticado);
  const estadoCargando = usePaginaLogIn((state) => state.estadoCargando);
  const establecerUsuario = usePaginaLogIn((state) => state.establecerUsuario);
  const establecerNombreUsuario = usePaginaLogIn((state) => state.establecerNombreUsuario);
  const establecerContraseniaUsuario = usePaginaLogIn((state) => state.establecerContraseniaUsuario);

  const autenticarUsuario = () => {
    const credenciales: SIniciarSesion = {
      username: nombreUsuario,
      contrasenia: contraseniaUsuario,
    };
    establecerUsuario(credenciales);
  };

  return (
    <div className="body2">
      
      <Container
            maxWidth='sm'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh'
            }}
            component='form'
            onSubmit={(e) => {
              e.preventDefault();
              autenticarUsuario();
            }}
          >
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <div className="typography-component">
                  <h1>LogicalData Test LogIn</h1>
              </div>
              <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                  <TextField
                    color='primary'
                    sx={ {backgroundColor: 'white', opacity: '60%', borderRadius: '3%', Color: 'black'}}
                    required={true}
                    label='Nombre de Usuario'
                    onChange={(e) => establecerNombreUsuario(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    color='primary'
                    sx={ {backgroundColor: 'white', opacity: '75%', borderRadius: '3%', Color: 'black'}}

                    required={true}
                    label='Contraseña'
                    type='password'
                    onChange={(e) => establecerContraseniaUsuario(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    endIcon={<Iconos.Login />}
                  >
                    <Typography>Log in</Typography>
                  </Button>
                </Grid>
                {alertErrorLogIn ? (
                  <Grid item>
                    <Alert severity='error'>{Constantes.INCORRECTO_USUARIO_CONTRASENIA}</Alert>
                  </Grid>
                ) : null}
                <ModalCargando cargando={estadoCargando === 'cargando'} />
              </Grid>
            </Box>
            {usuarioAutenticado ? <Navigate to="/home" /> : null}
          </Container>
    </div>
    
  );
};
