import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import * as Iconos from '@mui/icons-material';
import * as Constantes from '../../constantes/Constantes';
import './Facturas.css';

import { usePaginaFactura } from './store';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField, Typography, } from '@mui/material';

import { useEffect } from 'react';
import { Tabla } from '../../componentes/Tabla/Tabla';
import { ModalCargando } from '../../componentes/ModalCargando/ModalCargando';
import { ModalAlerta } from '../../componentes/ModalAlerta/ModalAlerta';
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Footer from '../../componentes/Footer/Footer2';
import BackButton from '../../componentes/Buttons/BackButton';

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Función que da transición de slide al dialog de comprobante de factura.
 * @returns Componente de transición.
 */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Componente de Facturas y ordenes.
 * @returns Componente de la página de Facturas y ordenes.
 */

export const Facturas = () => {

  const columns: GridColDef[] = [
    {
      field: 'codigo',
      headerName: Constantes.CODIGO,
      flex: 1,
      minWidth: 200,
      renderCell(params: any) {
        return productos.find((prod) => prod.id === params.row.productoId)
          ?.codigo;
      },
    },
    {
      field: 'nombre',
      headerName: Constantes.NOMBRE,
      flex: 1,
      minWidth: 100,
      renderCell(params: any) {
        return productos.find((prod) => prod.id === params.row.productoId)
          ?.nombre;
      },
    },
    {
      field: 'precio',
      headerName: Constantes.PRECIO,
      flex: 1,
      minWidth: 100,
      renderCell(params: any) {
        return productos.find((prod) => prod.id === params.row.d)
          ?.precio;
      },
    },
    {
      field: 'iva',
      headerName: Constantes.IVA,
      flex: 1,
      minWidth: 100,
      renderCell(params: any) {
        let itemCantidad = items.find(
          (item) => item.productoId === params.row.productoId
        )?.cantidad;

        let iva = productos.find(
          (prod) => prod.id === params.row.productoId
        )?.iva;

        if (itemCantidad) {
          return iva
            ? (params.row.precio * IVA * params.row.cantidad).toFixed(3)
            : 0;
        }
      },
    },
    {
      field: 'cantidad',
      headerName: Constantes.CANTIDAD,
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'total',
      headerName: Constantes.TOTAL,
      flex: 1,
      minWidth: 100,
      renderCell(params: any) {
        let prodCantidad = items.find(
          (item) => item.productoId === params.row.productoId
        )?.cantidad;

        let iva = productos.find(
          (prod) => prod.id === params.row.productoId
        )?.iva;

        if (prodCantidad) {
          let total = Number(params.row.precio) * prodCantidad;
          return iva ? (total + total * IVA).toFixed(3) : total;
        }
      },
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      minWidth: 100,
      getActions: (p: any) => [
        <GridActionsCellItem
          icon={<Iconos.Delete />}
          label={Constantes.ELIMINAR}
          onClick={() => {
            eliminarItem(p.row.productoId);
          }}
        />,
      ],
    },
  ];

  const productos = usePaginaFactura((state) => state.productos);

  const items = usePaginaFactura((state) => state.items);

  const estadoCargando = usePaginaFactura(
    (state) => state.estadoCargando
  );
  const IVA = usePaginaFactura((state) => state.IVA);

  const codigo = usePaginaFactura((state) => state.codigo);

  const nombre = usePaginaFactura(
    (state) => state.nombre
  );

  const fecha = usePaginaFactura((state) => state.fecha);

  const modalAbierto = usePaginaFactura(
    (state) => state.modalMensajesAbierto
  );

  const modalComprobanteAbierto = usePaginaFactura(
    (state) => state.modalComprobanteAbierto
  );

  const totalFactura = usePaginaFactura((state) => state.totalFactura);

  const subTotalFactura = usePaginaFactura(
    (state) => state.subTotalFactura
  );

  const tipoMensaje = usePaginaFactura((state) => state.tipoMensaje);

  const msjModal = usePaginaFactura((state) => state.msjModal);

  const agregarOrden = usePaginaFactura((state) => state.agregarOrden);

  const agregarItem = usePaginaFactura(
    (state) => state.agregarItem
  );

  const eliminarItem = usePaginaFactura(
    (state) => state.eliminarItem
  );

  const ivaFactura = usePaginaFactura((state) => state.IVATotal)

  const establecerCodigo = usePaginaFactura(
    (state) => state.establecerCodigo
  );

  const establecerItems = usePaginaFactura(
    (state) => state.establecerItems
  );

  const ordenId = usePaginaFactura((state) => state.ordenId);
  const establecerModalComprobante = usePaginaFactura(
    (state) => state.establecerModalComprobante
  );

  const establecerProductoCantidad = usePaginaFactura(
    (state) => state.establecerCantidad
  );

  const establecerModalMensajesAbierto = usePaginaFactura(
    (state) => state.establecerModalMensajesAbierto
  );

  const listarProductos = usePaginaFactura(
    (state) => state.listarProductos
  );
  const reiniciarEstado = usePaginaFactura(
    (state) => state.reiniciarEstado
  );

  useEffect(() => {
    reiniciarEstado();
  }, [reiniciarEstado]);

  useEffect(() => {
    listarProductos();
  }, [listarProductos]);

  useEffect(() => {
    establecerItems(items);
  }, [establecerItems, items]);

  return (
    <>
      <Container style={{ marginTop: '3%', marginBottom: '3%', backgroundColor: 'rgb(167, 170, 172)' }}>

        <Grid
          container
          item
          xs={12}
          display='grid'
          justifyContent='center'
          spacing={2}
          padding={5}
        >

          <Grid container item xs={12} spacing={10} >
            <div style={{ marginTop: '3%', marginLeft: '3%' }}>
              <BackButton route="/home" />

            </div>

            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="cod">{Constantes.CODIGO}</InputLabel>
                <Select
                  id='cod'
                  sx={{ minWidth: 250 }}
                  value={codigo}
                  label={Constantes.CODIGO}
                  onChange={(e) => establecerCodigo(e.target.value)}
                >
                  {productos.map((prod) => (
                    <MenuItem key={prod.id} value={prod.codigo}>
                      {prod.codigo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>
            <Grid item>
              <TextField
                required={true}
                label='Artículo'
                value={nombre}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                required={true}
                type='number'
                label='Cantidad'
                onChange={(e) =>
                  establecerProductoCantidad(Number(e.target.value))
                }
              ></TextField>
            </Grid>
            <Grid item alignSelf='center'>
              <Button
                startIcon={<Iconos.Add />}
                color='primary'
                variant='contained'
                type='submit'
                onClick={() => agregarItem()}
              >
                <Typography>{Constantes.AGREGAR}</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid style={{ display: 'grid', height: 460 }} item xs={12}>
            <Tabla
              titulo={Constantes.ORDEN_ARTICULOS}
              columnas={columns}
              registros={items}
              cargando={estadoCargando === 'cargando'}
              customDatosId={(items) => items.productoId}
            ></Tabla>
          </Grid>
          <Grid item display='flex' justifyContent='flex-end'>
            <Typography>
              {Constantes.ORDEN_SUBTOTAL}: {subTotalFactura}
            </Typography>
          </Grid>
          <Grid
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 460,
            }}
            item
            xs={12}
          >
            <Grid item>
              <Button
                startIcon={<Iconos.ShoppingBag />}
                color='warning'
                variant='contained'
                type='submit'
                onClick={() => agregarOrden()}
              >
                <Typography>{Constantes.FACTURAR}</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Typography>
                {Constantes.TOTAL}: {totalFactura}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <ModalCargando cargando={estadoCargando === 'cargando'} />
        <ModalAlerta
          abierto={modalAbierto}
          tipo={tipoMensaje}
          mensaje={msjModal}
          onClose={() => establecerModalMensajesAbierto(false)}
        ></ModalAlerta>

        <Dialog
          open={modalComprobanteAbierto}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => establecerModalComprobante(false)}
        >
          <DialogTitle>
            <Typography variant="h5" align="center" gutterBottom>
              {Constantes.ORDEN_COMPROBANTE}
            </Typography>
            <Typography variant="subtitle1" align="center">
              {Constantes.ORDEN_NUMERO + ordenId}
            </Typography>
            <Typography variant="subtitle1" align="center">
              {Constantes.ORDEN_FECHA + ': ' + fecha}
            </Typography>
            <Typography variant="subtitle1" align="center">
              {Constantes.ORDEN_USUARIO + ': ' + localStorage.getItem('username')}
            </Typography>
            <Typography variant="subtitle1" align="center">
              {Constantes.ORDEN_USUARIO_NOMBRE +
                ': ' +
                localStorage.getItem('nombre') +
                ' ' +
                localStorage.getItem('apellido')}
            </Typography>
          </DialogTitle>

          <DialogContent dividers>
            <Typography variant="h6" gutterBottom align="center">
              {Constantes.ORDEN_DETALLE}
            </Typography>
            <Grid container spacing={2} style={{ marginBottom: 16 }}>
              <Grid container item spacing={1}>
                <Grid item xs={2}><Typography variant="body2" align="center">{Constantes.ARTICULO}</Typography></Grid>
                <Grid item xs={2}><Typography variant="body2" align="center">{Constantes.CANTIDAD}</Typography></Grid>
                <Grid item xs={2}><Typography variant="body2" align="center">{Constantes.PRECIO_UNITARIO}</Typography></Grid>
                <Grid item xs={2}><Typography variant="body2" align="center">{Constantes.IVA}</Typography></Grid>
                <Grid item xs={2}><Typography variant="body2" align="center">{Constantes.ORDEN_SUBTOTAL}</Typography></Grid>
              </Grid>


              {items.map((item, index) => (

                <React.Fragment key={index}>
                  <Grid container item spacing={1} alignItems="center" style={{ borderTop: '1px solid #ddd', paddingTop: 8, paddingBottom: 8, marginTop:'1px'}}>
                    <Grid item xs={2}>
                      <Typography variant="body1" align="center">{productos.find((prod) => prod.id === item.productoId)?.nombre}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1" align="center">{item.cantidad}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1" align="center">{item.precio}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1" align="center">
                        {productos.find((prod) => prod.id === item.productoId)?.iva
                          ? (item.cantidad * item.precio * IVA).toFixed(2)
                          : 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1" align="center">
                        {(item.cantidad * item.precio).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container item spacing={1} style={{ paddingBottom: 8 }}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary" align="center">
                      </Typography>
                      {'código: ' + productos.find((prod) => prod.id === item.productoId)?.codigo}
                    </Grid>
                  </Grid>
                </React.Fragment>                
              ))}              
            </Grid>
            <Grid container justifyContent="flex-end" style={{ marginTop: 16, borderTop: '1px solid #ddd' }}>
              <Grid item xs={6} sm={4}>
                <Typography variant="h6" align="right">
                  {Constantes.IVA + ": " + ivaFactura.toFixed(2)}
                </Typography>
                <Typography variant="h6" align="right">
                  {Constantes.ORDEN_SUBTOTAL + ": " + subTotalFactura.toFixed(2)}
                </Typography>
                <Typography variant="h6" align="right">
                  {Constantes.ORDEN_TOTAL + ": " + totalFactura.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => establecerModalComprobante(false)} color="primary" variant="contained">
              {Constantes.CERRAR}
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
      <Footer />
    </>
  );
};
