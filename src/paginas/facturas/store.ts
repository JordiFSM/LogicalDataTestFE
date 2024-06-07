import { create } from 'zustand';
import { MProducto } from '../ventas/modelos/entidades/mProducto';
import { servicioProducto } from '../ventas/servicios/servicioProducto';
import { SOrden } from './modelos/solicitudes/SOrden';
import { servicioOrden } from './servicios/servicioOrden';
import * as Textos from '../../constantes/Constantes';
import { SItem } from './modelos/solicitudes/SItem';
import { SAgregarOrden } from './modelos/solicitudes/SAgregarOrden';

/**
 * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
 * Descripción: Define los atributos de la página de Gestión de Facturas.
 */
type PaginaFacturaState = {
  estadoCargando: 'sin-cargar' | 'cargando' | 'error' | 'cargado';
  estadoAgregar: 'sin-cargar' | 'cargando' | 'error';
  tipoMensaje: 'error' | 'correcto' | 'alerta';
  msjModal: string;
  productos: MProducto[];
  orden?: SOrden;
  ordenId: number;
  items: SItem[];
  fecha: string,
  modalMensajesAbierto: boolean;
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  productoIVA: number;
  aplicaIVA: boolean;
  cantidad: number;
  productoSeleccionadoId: number;
  productoSeleccionadoAplicaIVA: boolean;
  totalFactura: number;
  IVATotal: number,
  subTotalFactura: number;
  IVA: number;
  modalComprobanteAbierto: boolean;
};

/**
 * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
 * Descripción: Define las acciones de la página de LogIn.
 */

type PaginaFacturaActions = {
  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Lista los productos.
   */
  listarProductos: () => Promise<void>;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Agrega una orden.
   */
  agregarOrden: () => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Agrega un ordem item.
   */
  agregarItem: () => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Elimina un item de la orden.
   */
  eliminarItem: (itemId: number) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del nombre del producto.
   */
  establecerNombre: () => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del código del producto.
   * @param valor Valor por el cual se va establecer el atributo productoCodigo.
   */
  establecerCodigo: (valor: string) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del precio del producto.
   * @param valor Valor por el cual se va establecer el atributo productoPrecio.
   */
  establecerPrecio: (valor: number) => void;
  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor de la descripción del producto.
   * @param valor Valor por el cual se va establecer el atributo productoDescripción.
   */
  establecerDescripcion: (valor: string) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del producto con IVA.
   * @param valor Valor por el cual se va establecer el atributo productoIVA.
   */
  establecerIVA: (valor: number) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del ID del producto seleccionado.
   * @param valor Valor por el cual se va establecer el atributo productoSeleccionadoId.
   */
  establecerProductoSeleccionadoId: (valor: number) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor de la cantidad de productos.
   * @param valor Valor por el cual se va establecer el atributo productoCantidad.
   */
  establecerCantidad: (valor: number) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor de los items de la orden.
   * @param items Valor por el cual se va establecer el atributo orderItems.
   */
  establecerItems: (items: SItem[]) => void;


  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del IVA total de los items.
   * @param items Valor por el cual se va establecer el atributo orderItems.
   */
  calcularIVA: (items: SItem[], productos: MProducto[]) => number;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del total de la factura.
   */
  establecerTotalFactura: () => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor de si dicho producto aplica IVA.
   * @param valor Valor id del producto para obtener .iva y establecer productoSeleccionadoAplicaIVA.
   */
  establecerProductoSeleccionadoAplicaIVA: (productId: number) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del modal abierto.
   * @param valor Valor por el cual se va establecer el atributo modalMensajesAbierto.
   */
  establecerModalMensajesAbierto: (valor: boolean) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del modal de comprobante.
   * @param valor Valor por el cual se va establecer el atributo modalComprobanteAbierto.
   */
  establecerModalComprobante: (valor: boolean) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Reinicia al estado inicial los atributos del componente.
   */
  reiniciarEstado: () => void;
};

/**
 * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
 * Descripción: Constante que define el estado inicial de la página de Gestión de Facturas.
 */
const estadoInicial: PaginaFacturaState = {
  estadoCargando: 'sin-cargar',
  estadoAgregar: 'sin-cargar',
  tipoMensaje: 'alerta',
  productos: [],
  items: [],
  fecha: '',
  modalMensajesAbierto: false,
  id: 0,
  codigo: '',
  nombre: '',
  descripcion: '',
  precio: 0,
  productoIVA: 0,
  cantidad: 0,
  aplicaIVA: false,
  productoSeleccionadoId: 0,
  totalFactura: 0,
  subTotalFactura: 0,
  IVATotal: 0,
  IVA: 0.13,
  productoSeleccionadoAplicaIVA: false,
  msjModal: '',
  modalComprobanteAbierto: false,
  ordenId: 0,
};

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Objeto constante que define los atributos y acciones de la página de Gestión de Productos.
 */
export const usePaginaFactura = create<
  PaginaFacturaState & PaginaFacturaActions
>((set, get) => ({
  ...estadoInicial,

  listarProductos: async () => {
    const respuesta = await servicioProducto.listarProductos();
    if (respuesta.respuestaExitosa) {
      set({
        productos: respuesta.dato,
        estadoCargando: 'cargado',
      });
    } else {
      set({ estadoCargando: 'error' });
    }
  },

  agregarOrden: async () => {
    const { items, productos, totalFactura, calcularIVA } = get();
    const fechaActual: Date = new Date();
    const fechaString = fechaActual.toISOString()
    let orden: SOrden = {
      usuarioId: Number(localStorage.getItem('id')),
      fecha: new Date(fechaString),
      total: totalFactura,
    };

    let solicitud: SAgregarOrden = {
      orden: orden,
      items: items,
    };



    set({ estadoCargando: 'cargando' });
    const respuesta = await servicioOrden.agregarOrden(solicitud);

    var ivatotal = calcularIVA(items, productos)

    if (respuesta.respuestaExitosa) {
      set({
        orden: respuesta.dato,
        ordenId: respuesta.dato?.id,
        IVATotal: ivatotal,
        fecha: fechaActual.toDateString(),
        estadoCargando: 'cargado',
        tipoMensaje: 'correcto',
        msjModal: Textos.EXITO_AGREGANDO_ORDEN,
        modalMensajesAbierto: true,
      });
      
    } else {        
      set({ estadoCargando: 'error', modalMensajesAbierto: true, tipoMensaje: 'error', msjModal: Textos.ERROR_AGREGAR_ORDEN, });
    }
  },

  agregarItem: () => { const { items, productos, cantidad, codigo, establecerItems, establecerTotalFactura } = get();
    let producto = productos.find((prod) => prod.codigo === codigo);

    if (producto) {
      let item: SItem = {
        cantidad: cantidad,
        productoId: producto.id,
        precio: producto?.precio,
      };

      if (items.find((prod) => prod.productoId === producto?.id)) {
        const nuevosItems = items.filter(
          (item) => item.productoId !== producto?.id
        );
        const itemsActualizados = [...nuevosItems, item];

        establecerItems(itemsActualizados);
      } else {
        const itemsActualizados = [...items, item];
        establecerItems(itemsActualizados);
      }
    }

    establecerTotalFactura();
  },

  calcularIVA(items: SItem[], productos: MProducto[]): number {
    let totalIVA = 0;
  
    items.forEach((item) => {
      const producto = productos.find((prod) => prod.id === item.productoId);
      if (producto) {
        const subtotal = item.cantidad * item.precio;
        totalIVA += subtotal*0.13;
      }
    });
  
    return totalIVA;
  },

  eliminarItem: (itemId: number) => {
    const { items, establecerItems, establecerTotalFactura } = get();
    const nuevosItems = items.filter((item) => item.productoId !== itemId);

    establecerItems(nuevosItems);
    establecerTotalFactura();
  },

  establecerNombre: () => {
    const { productos, codigo } = get();

    let producto = productos.find((prod) => prod.codigo === codigo);
    set({ nombre: producto?.nombre });
  },

  establecerCodigo: (valor: string) => {
    const { establecerNombre } = get();
    set({ codigo: valor });

    establecerNombre();
  },

  establecerPrecio: (valor: number) => {
    set({ precio: valor });
  },

  establecerDescripcion: (valor: string) => {
    set({ descripcion: valor });
  },

  establecerIVA: (valor: number) => {
    set({ productoIVA: valor });
  },

  establecerProductoSeleccionadoId: (valor: number) => {
    set({ productoSeleccionadoId: valor });
  },

  establecerCantidad: (valor: number) => {
    set({ cantidad: valor });
  },

  establecerItems: (items: SItem[]) => {
    set({ items: items });
  },

  establecerTotalFactura: () => {
    const { items, IVA, productos } = get();
    let total = 0;
    let subTotal = 0;
    items.forEach((item) => {
      let producto = productos.find(
        (prod) => prod.id === item.productoId
      );
      subTotal += item.precio * item.cantidad;
      if (producto?.iva) {
        let itemIva = item.precio * item.cantidad * IVA;
        total += item.precio * item.cantidad + itemIva;
      } else {
        total += item.precio * item.cantidad;
      }
    });

    set({ totalFactura: total, subTotalFactura: subTotal });
  },

  establecerProductoSeleccionadoAplicaIVA: (productId: number) => {
    const { productos } = get();
    let producto = productos.find((prod) => prod.id === productId);
    if (producto) {
      set({ productoSeleccionadoAplicaIVA: producto.iva });
    }
  },

  establecerModalMensajesAbierto: (valor: boolean) => {
    set({ modalMensajesAbierto: valor });

    if (!valor) {
      set({ modalComprobanteAbierto: true })
    }
  },

  establecerModalComprobante: (valor: boolean) => {
    const { reiniciarEstado } = get();
    set({ modalComprobanteAbierto: valor})

    if (!valor) {
      set({ reiniciarEstado })
    }
  },

  reiniciarEstado: () => {
    set(estadoInicial);
  },
}));
