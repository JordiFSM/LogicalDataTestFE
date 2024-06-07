import { Avatar, Box, Button, DialogContent, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as Iconos from '@mui/icons-material';
import * as Textos from '../../constantes/Constantes';

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface para los parámetros del componente ModalAlertaProps.
 */
interface ModalAlertaProps {
    abierto: boolean,
    tipo: "correcto" | "alerta" | "error",
    titulo?: string,
    mensaje?: string,
    textoBoton?: string,
    onClose: () => void
}

export const ModalAlerta = (props: ModalAlertaProps) => {

    let colorIcono: String;
    let icono: JSX.Element;
    let titulo: string;
    let mensaje: string;

    switch (props.tipo) {
        case "correcto":
            colorIcono = "green";
            icono = <Iconos.CheckCircle></Iconos.CheckCircle>;
            titulo = Textos.CORRECTO;
            mensaje = Textos.COMPLETO_ACCION_FORMA_CORRECTA;
            break;
        case "alerta":
            colorIcono = "blue";
            icono = <Iconos.Error></Iconos.Error>;
            titulo = Textos.ALERTA;
            mensaje = Textos.ALERTA;
            break;
        case "error":
            colorIcono = "red";
            icono = <Iconos.Cancel></Iconos.Cancel>;
            titulo = Textos.ERROR;
            mensaje = Textos.OCURRIO_ERROR_EJECUTAR_ACCION;
            break;
    };

    if (props.titulo) {
        titulo = props.titulo;
    }

    if (props.mensaje) {
        mensaje = props.mensaje;
    }

    return (
        <Dialog open={props.abierto} maxWidth="md" onClose={props.onClose}>
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2
                    }}>
                    <Avatar sx={{ m: 1, mb: 2, bgcolor: colorIcono.toString() }}>
                        {icono}
                    </Avatar>
                    <Typography variant="h5" gutterBottom>
                        {titulo}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        {mensaje}
                    </Typography>
                    <Button style={{marginTop: 20}} onClick={props.onClose}>
                      <Typography>{props.textoBoton ? props.textoBoton : Textos.ACEPTAR}</Typography>
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}