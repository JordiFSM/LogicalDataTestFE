import axios from "axios";
import { MRespuesta } from "../../../modelos/mRespuesta";
import * as Textos from '../../../constantes/Constantes';
import { SOrden } from "../modelos/solicitudes/SOrden";
import { MOrdenRespuesta } from "../modelos/entidades/mOrdenRespuesta";
import { SAgregarOrden } from "../modelos/solicitudes/SAgregarOrden";

const { REACT_APP_API_PORT_BACKEND_LOGICAL_DATA } = process.env;
const BASE_END_POINT: string = `https://localhost:${REACT_APP_API_PORT_BACKEND_LOGICAL_DATA}/api/Orden/`;
const TOKEN = localStorage.getItem('token');

export const servicioOrden = {

    /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Agrega una orden al sistema.
   * @param solicitud modelo de la orden.
   * @returns Retorna la respuesta y la orden agregada, si fue exitoso.
   */
    agregarOrden: async (solicitud: SAgregarOrden) => {
      let respuestaFinal: MRespuesta<SOrden> = new MRespuesta<SOrden>();
  
      try {
        console.log(BASE_END_POINT)

        await axios
          .post<MOrdenRespuesta>(`${BASE_END_POINT}AgregarOrden`, solicitud, { headers: { Authorization: `Bearer ${TOKEN}` } })
          .then((res) => {

            respuestaFinal.dato = res.data.dato;
            respuestaFinal.respuestaExitosa = true;
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
            // Manejar el error, podría mostrar un mensaje al usuario, etc.
          });

      } catch (error: any) {
        respuestaFinal.mensaje = Textos.ERROR_AGREGAR_ORDEN;
        respuestaFinal.respuestaExitosa = false;
      }
  
      return respuestaFinal;
    },

}