/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Clase que encapsula la respuesta de la API.
 */
export class MRespuesta<T> {
  respuestaExitosa: boolean = false;
  mensaje: string = "";
  dato?: T;
}