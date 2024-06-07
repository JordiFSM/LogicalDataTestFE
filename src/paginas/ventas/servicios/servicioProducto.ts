import axios from 'axios';
import { MProducto } from '../modelos/entidades/mProducto';
import { MRespuesta } from '../../../modelos/mRespuesta';
import { MProductoRespuesta } from '../modelos/entidades/mProductoRespuesta';
import * as Textos from '../../../constantes/Constantes';
import { SAgregarProducto } from '../modelos/solicitudes/sAgregarProducto';
import { SActualizarProducto } from '../modelos/solicitudes/sActualizarProducto';

const { REACT_APP_API_PORT_BACKEND_LOGICAL_DATA } = process.env;
const BACKEND_END_POINT: string = `https://localhost:${REACT_APP_API_PORT_BACKEND_LOGICAL_DATA}/api/Producto/`;
const TOKEN = localStorage.getItem('token');

export const servicioProducto = {
  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Lista los productos del sistema.
   * @returns Arreglo de productos.
   */
  listarProductos: async () => {
    let respuestaFinal: MRespuesta<MProducto[]> = new MRespuesta<MProducto[]>();
    try {
      await axios
        .get<MProductoRespuesta>(`${BACKEND_END_POINT}ListarProductos`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        })
        .then((res) => {
          respuestaFinal.dato = res.data.dato;
          respuestaFinal.respuestaExitosa = true;
        });
      
    } catch (error: any) {
      respuestaFinal.mensaje = Textos.ERROR_LISTAR_ARTICULOS;
      respuestaFinal.respuestaExitosa = false;
    }

    return respuestaFinal;
  },

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Agrega un producto al sistema.
   * @param solicitud modelo del producto.
   * @returns Retorna la respuesta y el producto agregado, si fue exitoso.
   */
  agregarProducto: async (solicitud: SAgregarProducto) => {
    let respuestaFinal: MRespuesta<MProducto> = new MRespuesta<MProducto>();

    try {
      const respuesta: any = await axios
        .post<MProductoRespuesta>(
          `${BACKEND_END_POINT}AgregarProducto`,
          solicitud,
          { headers: { Authorization: `Bearer ${TOKEN}` } }
        )
        respuestaFinal.dato = respuesta.data.dato[0];
        respuestaFinal.respuestaExitosa = true;
    } catch (error: any) {
      respuestaFinal.mensaje = Textos.ERROR_AGREGANDO_ARTICULO;
      respuestaFinal.respuestaExitosa = false;
    }

    return respuestaFinal;
  },

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Actualiza un producto del sistema.
   * @param id id del producto.
   * @returns Retorna true si fue exitoso, false de lo contrario.
   */
  actualizarProducto: async (solicitud: SActualizarProducto) => {
    let respuestaFinal: MRespuesta<MProducto> = new MRespuesta<MProducto>();

    try {
      const respuesta = await axios
        .put<MProductoRespuesta>(
          `${BACKEND_END_POINT}ActualizarProducto`,
          solicitud,
          { headers: { Authorization: `Bearer ${TOKEN}` } }
        )
        .then((res) => {
          respuestaFinal.dato = res.data.dato[0];
          respuestaFinal.respuestaExitosa = true;
        });
    } catch (error: any) {
      respuestaFinal.mensaje = Textos.ERROR_ACTUALIZANDO_ARTICULO;
      respuestaFinal.respuestaExitosa = false;
    }

    return respuestaFinal;
  },

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Elimina un producto del sistema.
   * @param id id del producto.
   * @returns Retorna la respuesta y el producto eliminado, si fue exitoso.
   */
  eliminarProducto: async (id: number) => {
    let respuestaFinal: MRespuesta<MProducto> = new MRespuesta<MProducto>();

    try {
      const respuesta = await axios
        .delete<MProductoRespuesta>(
          `${BACKEND_END_POINT}BorrarProducto?id=${id}`,
          { headers: { Authorization: `Bearer ${TOKEN}` } }
        )
        .then((res) => {
          respuestaFinal.dato = res.data.dato[0];
          respuestaFinal.respuestaExitosa = true;
        });
    } catch (error: any) {
      respuestaFinal.mensaje = Textos.ERROR_ELIMINANDO_ARTICULO;
      respuestaFinal.respuestaExitosa = false;
    }

    return respuestaFinal;
  },
};
