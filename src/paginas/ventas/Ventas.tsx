
import { useEffect } from 'react';
import { Button, Checkbox, DialogActions, DialogTitle, FormControlLabel, TextField } from '@mui/material';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { ModalCargando } from '../../componentes/ModalCargando/ModalCargando';
import { ModalAlerta } from '../../componentes/ModalAlerta/ModalAlerta';

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

import DialogContent from '@mui/material/DialogContent';
import { Tabla } from '../../componentes/Tabla/Tabla';
import * as Iconos from '@mui/icons-material';
import * as Constantes from '../../constantes/Constantes';
import { usePaginaVentas } from './store';
import { ModalConfirmacion } from '../../componentes/ModalConfirmar/ModalConfirmar';
import Footer from '../../componentes/Footer/Footer2';
import BackButton from '../../componentes/Buttons/BackButton';


/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Componente de GestionProducto.
 * @returns Componente de la página de Ventas.
 */
export const Ventas = () => {
  const IVA: number = 0.13;
  const columns: GridColDef[] = [
    {
      field: 'codigo',
      headerName: Constantes.CODIGO,
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'nombre',
      headerName: Constantes.NOMBRE,
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'descripcion',
      headerName: Constantes.DESCRIPCION,
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'precio',
      headerName: Constantes.PRECIO,
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'iva',
      headerName: Constantes.IVA,
      flex: 1,
      minWidth: 100,
      renderCell(params: any) {
        return params.row.iva ? params.row.precio * IVA : 0;
      },
    },
    {
      field: 'total',
      headerName: Constantes.TOTAL,
      flex: 1,
      minWidth: 100,
      renderCell(params: any) {
        return params.row.iva ? params.row.precio * IVA + params.row.precio : params.row.precio;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      minWidth: 100,
      getActions: (p: any) => [
        <GridActionsCellItem
          icon={<Iconos.Edit />}
          style={{ color: 'blue' }}

          label={Constantes.EDITAR}
          onClick={() => {
            establecerProductCode(p.row.codigo);
            establecerModalAgregarEditarAbierto(p.row.id);
          }}
        />,
        <GridActionsCellItem
          icon={<Iconos.Delete />}
          style={{ color: 'red' }}
          label={Constantes.ELIMINAR}
          onClick={() => {
            establecerModalBorrarAbierto(p.row.id);
          }}
        />,
      ],
    },
  ];

  const productos = usePaginaVentas((state) => state.productos);

  const estadoCargando = usePaginaVentas(
    (state) => state.estadoCargando
  );
  const modalAbiertoAgregarEditar = usePaginaVentas(
    (state) => state.modalAbiertoAgregarEditar
  );
  const modalBorrarAbierto = usePaginaVentas(
    (state) => state.modalBorrarAbierto
  );
  const msjModal = usePaginaVentas((state) => state.msjModal);

  const tipoMensaje = usePaginaVentas((state) => state.tipoMensaje);

  const tituloModal = usePaginaVentas((state) => state.tituloModal);

  const nombreProducto = usePaginaVentas((state) => state.nombre);
  const descripcionProducto = usePaginaVentas(
    (state) => state.descripcion
  );
  const precioProducto = usePaginaVentas((state) => state.precio);

  const ivaProducto = usePaginaVentas((state) => state.aplicaIVA);

  const estadoAgregarEditar = usePaginaVentas(
    (state) => state.estadoAgregarEditar
  );

  const modalAbierto = usePaginaVentas(
    (state) => state.modalMensajesAbierto
  );

  const establecerModalAgregarEditarAbierto = usePaginaVentas(
    (state) => state.establecerModalAgregarEditarAbierto
  );

  const establecerModalAgregarEditarCerrar = usePaginaVentas(
    (state) => state.establecerModalAgregarEditarCerrar
  );

  const establecerModalBorrarAbierto = usePaginaVentas(
    (state) => state.establecerModalBorrarAbierto
  );

  const listarProductos = usePaginaVentas(
    (state) => state.listarProductos
  );

  const reiniciarEstado = usePaginaVentas(
    (state) => state.reiniciarEstado
  );

  const establecerModalBorrarAbiertoConfirmacion = usePaginaVentas(
    (state) => state.establecerModalBorrarAbiertoConfirmacion
  );

  const establecerModalMensajesAbierto = usePaginaVentas(
    (state) => state.establecerModalMensajesAbierto
  );

  const establecerProductCode = usePaginaVentas(
    (state) => state.establecerCodigo
  );

  const establecerNombre = usePaginaVentas(
    (state) => state.establecerNombre
  );

  const establecerDescripcion = usePaginaVentas(
    (state) => state.establecerDescripcion
  );

  const establecerPrecio = usePaginaVentas(
    (state) => state.establecerPrecio
  );

  const establecerAplicaIVA = usePaginaVentas(
    (state) => state.establecerAplicaIVA
  );

  const productoAgregarEditar = usePaginaVentas(
    (state) => state.productoAgregarEditar
  );

  useEffect(() => {
    reiniciarEstado();
  }, [reiniciarEstado]);

  useEffect(() => {
    listarProductos();
  }, [listarProductos]);

  return (
    <div>

      <Container style={{ marginTop: "8%", marginBottom: '3%', backgroundColor: 'rgb(167, 170, 172)' }}>        
        <Grid container item xs={12} justifyContent='space-between' spacing={2} marginBottom='10%' marginTop='2%' >
          <div style={{ marginTop: "1%", marginLeft:'2%'}}>
            <BackButton route="/home" />          
          </div>
          <Grid container item xs={12} justifyContent='space-between'>            
            <Grid item>
              <Typography component='h1' variant='h4'>
                {Constantes.MENU_ARTICULOS}
              </Typography>
            </Grid>
            <Grid item alignSelf='center'>
              <Button
                startIcon={<Iconos.Add />}
                color='success'
                variant='contained'
                onClick={() => establecerModalAgregarEditarAbierto()}
              >
                <Typography>{Constantes.AGREGAR}</Typography>
              </Button>
            </Grid>
          </Grid>
          <Dialog
            open={modalAbiertoAgregarEditar}
            maxWidth='md'
            onClose={() => establecerModalAgregarEditarCerrar()}
          >
            <DialogTitle>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h5'>{tituloModal}</Typography>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Box
                noValidate
                component='form'
                onSubmit={(e) => {
                  e.preventDefault();
                  productoAgregarEditar();
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 2,
                  justifyContent: 'center'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required={true}
                      label='Nombre del artículo'
                      onChange={(e) => establecerNombre(e.target.value)}
                      value={nombreProducto}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required={true}
                      label='Descripción del artículo'
                      onChange={(e) => establecerDescripcion(e.target.value)}
                      value={descripcionProducto}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required={true}
                      type='number'
                      label='Precio del artículo'
                      onChange={(e) => establecerPrecio(Number(e.target.value))}
                      value={precioProducto}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={ivaProducto}
                          onChange={(e) => establecerAplicaIVA(!ivaProducto)}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                      label={Constantes.IVA_APLICA}
                    ></FormControlLabel>
                  </Grid>
                </Grid>
                <Button
                  id='botonSubmitAgregarEditar'
                  type='submit'
                  style={{ display: 'none' }}
                  color='success'
                  variant='contained'
                >
                  <Typography>{Constantes.AGREGAR}</Typography>
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Grid
                container
                spacing={2}
                justifyContent='center'
                style={{ marginBottom: 4 }}
              >
                <Grid
                  container
                  item
                  justifyContent='center'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      startIcon={<Iconos.Cancel />}
                      onClick={() => establecerModalAgregarEditarCerrar()}
                      variant='contained'
                      color='secondary'
                    >
                      <Typography>{Constantes.CANCELAR}</Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type='submit'
                      color='primary'
                      variant='contained'
                      style={{ width: '100%' }}
                      startIcon={<Iconos.Save />}
                      onClick={() =>
                        document
                          .getElementById('botonSubmitAgregarEditar')
                          ?.click()
                      }
                    >
                      <Typography>{Constantes.GUARDAR}</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
          <Grid style={{ display: 'grid', height: 460 }} item xs={12}>
            <Tabla
              titulo={Constantes.LISTADO_ARTICULOS}
              columnas={columns}
              registros={productos}
              cargando={estadoCargando === 'cargando'}
              customDatosId={(productos) => productos.codigo}
            ></Tabla>
          </Grid>
          <ModalConfirmacion
            abierto={modalBorrarAbierto}
            mensaje={Constantes.CONFIRME_DESEA_ELIMINAR_ARTICULO}
            onConfirmacion={() => establecerModalBorrarAbiertoConfirmacion(true)}
            onCancelacion={() => establecerModalBorrarAbiertoConfirmacion(false)}
          />

          <ModalCargando cargando={estadoAgregarEditar === 'cargando'} />

          <ModalAlerta
            abierto={modalAbierto}
            tipo={tipoMensaje}
            mensaje={msjModal}
            onClose={() => establecerModalMensajesAbierto(false)}
          />
        </Grid>
      </Container>
      <Footer />

    </div>



  );
};
