import { MUsuarioToken } from "./mUsuarioToken";

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface del modelo de MAutenticacionRespuesta.
 */
export interface MAutenticacionRespuesta {
  estadoRespuesta: number,
  mensaje: string,
  dato: MUsuarioToken
}