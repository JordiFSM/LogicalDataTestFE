import { Avatar, Box, Button, DialogContent, Grid, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import * as Iconos from '@mui/icons-material';
import * as Textos from '../../constantes/Constantes';

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface para los parámetros del componente ModalConfirmacionProps.
 */
interface ModalConfirmacionProps {
  abierto: boolean;
  titulo?: string;
  mensaje?: string;
  textoBotonConfirmar?: string;
  textoBotonCancelar?: string;
  onConfirmacion: () => void;
  onCancelacion: () => void;
}

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Componente del Modal de confirmacion.
 * @returns Componente modal de confirmacion.
 */
export const ModalConfirmacion = (props: ModalConfirmacionProps) => {
  let titulo: string = Textos.CONFIRMAR;
  let mensaje: string = Textos.CONFIRME_DESEA_REALIZAR_ACCION;

  if (props.titulo) {
    titulo = props.titulo;
  }

  if (props.mensaje) {
    mensaje = props.mensaje;
  }

  return (
    <Dialog open={props.abierto} maxWidth='md'>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Avatar sx={{ m: 1, mb: 2, bgcolor: 'blue' }}>
            <Iconos.QuestionMark />
          </Avatar>
          <Typography variant='h5' gutterBottom>
            {titulo}
          </Typography>
          <Typography variant='body1' textAlign='center'>
            {mensaje}
          </Typography>
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid item>
              <Button
                style={{ marginTop: 20 }}
                onClick={props.onCancelacion}
                color='secondary'
                variant='contained'
              >
                <Typography>
                  {props.textoBotonCancelar
                    ? props.textoBotonCancelar
                    : Textos.CANCELAR}
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ marginTop: 20 }}
                onClick={props.onConfirmacion}
                color='primary'
                variant='contained'
              >
                <Typography>
                  {props.textoBotonConfirmar
                    ? props.textoBotonConfirmar
                    : Textos.CONFIRMAR}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
