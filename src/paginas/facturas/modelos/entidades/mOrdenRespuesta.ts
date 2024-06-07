import { MOrden } from "./mOrden";

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface que encapsula la respuesta de ordenes de la API.
 */
export interface MOrdenRespuesta {
  estadoRespuesta: number;
  mensaje: string;
  dato: MOrden;
}