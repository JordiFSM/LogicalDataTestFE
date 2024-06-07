import { create } from 'zustand';
import { servicioProducto } from './servicios/servicioProducto';
import * as Constantes from '../../constantes/Constantes';
import { MProducto } from './modelos/entidades/mProducto';

import { SAgregarProducto } from './modelos/solicitudes/sAgregarProducto';
import { SActualizarProducto } from './modelos/solicitudes/sActualizarProducto';

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Define los atributos de la página de Gestión de Productos.
 */
type PaginaVentasState = {
  estadoCargando: 'sin-cargar' | 'cargando' | 'error' | 'cargado';
  estadoAgregarEditar: 'sin-cargar' | 'cargando' | 'error';
  tipoMensaje: 'error' | 'correcto' | 'alerta';
  productos: MProducto[];
  modalAbiertoAgregarEditar: boolean;
  modalMensajesAbierto: boolean;
  modalBorrarAbierto: boolean;
  tituloModal: string;
  descripcion: string;
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  aplicaIVA: boolean;
  esEdicion: boolean;
  msjModal: string;
};

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Define las acciones de la página de LogIn.
 */

type PaginaVentasActions = {
  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Lista los productos.
   */
  listarProductos: () => Promise<void>;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Agrega un producto.
   */
  agregarProducto: () => Promise<void>;  

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Actualiza un producto.
   */
  actualizarProducto: () => Promise<void>;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Elimina un producto..
   */
  eliminarProducto: () => Promise<void>;

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
   * Descripción: Establece el valor del modal borrar abierto confirmación.
   * @param valor Valor por el cual se va establecer el atributo modalBorrarAbiertoConfirmacion, además que indica si se borra o no.
   */
  establecerModalBorrarAbiertoConfirmacion: (valor: boolean) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Verifica que acción realizar dependiendo del modal abierto si editar o registrar.
   */
  productoAgregarEditar: () => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del modal agregar o editar, además de establecer el id del producto si es una acción de editar.
   * @param productoId Valor por el cual se va establecer el atributo id, el cual se cambiará solo si se va a editar.
   */
  establecerModalAgregarEditarAbierto: (productoId?: number) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del modal agregar o editar en falso, cerrar el modal.
   */
  establecerModalAgregarEditarCerrar: () => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del id del producto y abre el modal de confirmación para borrar.
   * @param productoId Identificador del elemento a borrar.
   */
  establecerModalBorrarAbierto: (productoId: number) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del nombre.
   * @param valor Valor por el cual se va establecer el atributo nombre.
   */
  establecerNombre: (valor: string) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del código.
   * @param valor Valor por el cual se va establecer el atributo codigo.
   */
  establecerCodigo: (valor: string) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del precio.
   * @param valor Valor por el cual se va establecer el atributo precio.
   */
  establecerPrecio: (valor: number) => void;
  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor de la descripción.
   * @param valor Valor por el cual se va establecer el atributo descripción.
   */
  establecerDescripcion: (valor: string) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor de si aplica IVA.
   * @param valor Valor por el cual se va establecer el atributo de aplicaIVA.
   */
  establecerAplicaIVA: (valor: boolean) => void;

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
 * Descripción: Constante que define el estado inicial de la página de Gestión de Productos.
 */
const estadoInicial: PaginaVentasState = {
  estadoCargando: 'sin-cargar',
  estadoAgregarEditar: 'sin-cargar',
  productos: [],
  modalAbiertoAgregarEditar: false,
  modalMensajesAbierto: false,
  modalBorrarAbierto: false,
  tituloModal: '',
  descripcion: '',
  nombre: '',
  precio: 0,
  id: 0,
  codigo: '',
  aplicaIVA: false,
  msjModal: '',
  esEdicion: false,
  tipoMensaje: 'alerta',
};

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Objeto constante que define los atributos y acciones de la página de Gestión de Productos.
 */
export const usePaginaVentas = create<
  PaginaVentasState & PaginaVentasActions
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

  agregarProducto: async () => {
    const { nombre, descripcion, precio, aplicaIVA, productos, listarProductos } = get();

    const solicitud: SAgregarProducto = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      iva: aplicaIVA,
    };

    set({ estadoAgregarEditar: 'cargando' });

    const respuesta = await servicioProducto.agregarProducto(solicitud);

    if (respuesta.respuestaExitosa) {
      const { establecerModalAgregarEditarCerrar } = get();
        listarProductos();

      set({
        tipoMensaje: 'correcto',
        msjModal: Constantes.EXITO_AGREGANDO_ARTICULO,
        modalMensajesAbierto: true,
        estadoAgregarEditar: 'sin-cargar',
      });
      establecerModalAgregarEditarCerrar();
    } else {
      set({
        msjModal: respuesta.mensaje,
        tipoMensaje: 'error',
        modalMensajesAbierto: true,
        estadoAgregarEditar: 'sin-cargar',
      });
    }
  },  

  actualizarProducto: async () => {
    const {
      id,
      codigo,
      nombre,
      descripcion,
      productos,
      aplicaIVA,
      precio,
    } = get();
    const solicitud: SActualizarProducto = {
      id: id,
      codigo: codigo,
      nombre: nombre.trim(),
      descripcion: descripcion.toString().trim(),
      precio: precio,
      iva: aplicaIVA,
    };

    set({ estadoAgregarEditar: 'cargando' });
    const respuesta = await servicioProducto.actualizarProducto(solicitud);

    if (respuesta.respuestaExitosa) {
      const { establecerModalAgregarEditarCerrar } = get();
      const indiceDocumento = productos.findIndex(
        (prod) => prod.id === id
      );

      productos[indiceDocumento].nombre = nombre.trim();
      productos[indiceDocumento].descripcion = descripcion
        .toString()
        .trim();
      productos[indiceDocumento].precio = precio;
      productos[indiceDocumento].iva = aplicaIVA;

      set({
        productos: productos,
        tipoMensaje: 'correcto',
        msjModal: Constantes.EXITO_ACTUALIZANDO_ARTICULO,
        modalMensajesAbierto: true,
        estadoAgregarEditar: 'sin-cargar',
      });
      establecerModalAgregarEditarCerrar();
    } else {
      set({
        msjModal: respuesta.mensaje,
        tipoMensaje: 'error',
        modalMensajesAbierto: true,
        estadoAgregarEditar: 'sin-cargar',
      });
    }
  },

  eliminarProducto: async () => {
    const { id, productos } = get();

    set({ estadoAgregarEditar: 'cargando' });
    const respuesta = await servicioProducto.eliminarProducto(id);

    if (respuesta.respuestaExitosa) {
      const productosActualizados = productos.filter(
        (prod) => prod.id !== id
      );
      set({
        productos: productosActualizados,
        tipoMensaje: 'correcto',
        msjModal: Constantes.EXITO_ELIMINANDO_ARTICULO,
        modalMensajesAbierto: true,
        estadoAgregarEditar: 'sin-cargar',
      });
    } else {
      set({
        msjModal: respuesta.mensaje,
        tipoMensaje: 'error',
        modalMensajesAbierto: true,
        estadoAgregarEditar: 'sin-cargar',
      });
    }
  },

  establecerModalMensajesAbierto: (valor: boolean) => {
    set({ modalMensajesAbierto: valor });
  },

  establecerModalBorrarAbiertoConfirmacion: (valor: boolean) => {
    const { eliminarProducto } = get();

    set({ modalBorrarAbierto: false });

    if (valor) {
      eliminarProducto();
    }
  },

  productoAgregarEditar: () => {
    const { esEdicion } = get();
    if (esEdicion) {
      const { actualizarProducto } = get();

      actualizarProducto();
    } else {
      const { agregarProducto } = get();

      agregarProducto();
    }
  },

  establecerModalAgregarEditarAbierto: (id?: number) => {
    if (id) {
      const { productos } = get();
      const producto = productos.find((prod) => prod.id === id);

      set({
        tituloModal: Constantes.EDITAR_ARTICULO,
        modalAbiertoAgregarEditar: true,
        
        esEdicion: true,
        id: producto?.id,
        nombre: producto?.nombre,
        precio: producto?.precio,
        descripcion: producto?.descripcion,
        aplicaIVA: producto?.iva,
        
      });
    } else {
      set({
        tituloModal: Constantes.AGREGAR_ARTICULO,
        modalAbiertoAgregarEditar: true,
        nombre: '',
        descripcion: '',
        precio: 0,
        aplicaIVA: false,
        esEdicion: false,
      });
    }
  },

  establecerModalAgregarEditarCerrar: () => {
    set({ modalAbiertoAgregarEditar: false });
  },

  establecerModalBorrarAbierto: (productoId: number) => {
    set({ modalBorrarAbierto: true, id: productoId });
  },

  establecerCodigo: (valor: string) => {
    set({ codigo: valor });
  },

  establecerNombre: (valor: string) => {
    set({ nombre: valor });
  },

  establecerAplicaIVA: (valor: boolean) => {
    set({ aplicaIVA: valor });
  },

  establecerDescripcion: (valor: string) => {
    set({ descripcion: valor });
  },

  establecerPrecio: (valor: number) => {
    set({ precio: valor });
  },

  

  reiniciarEstado: () => {
    set(estadoInicial);
  },
}));
