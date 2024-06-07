import { Box, CircularProgress, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface para los parámetros del componente ModalCargandoProps.
 */
interface ModalCargandoProps {
    cargando: boolean
}

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Componente Modal de carga.
 * @returns Componente modal de carga.
 */
export const ModalCargando = (props: ModalCargandoProps) => {

    return (
        <Dialog open={props.cargando} maxWidth="md">
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2
                    }}>
                    <CircularProgress />
                </Box>
            </DialogContent>
        </Dialog>
    );
}