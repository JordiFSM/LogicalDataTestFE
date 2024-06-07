import { Usuario } from "./mUsuario";

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface del modelo del usuario y la autenticacion.
 */
export interface MUsuarioToken {
  usuario: Usuario,
  token: string,
}