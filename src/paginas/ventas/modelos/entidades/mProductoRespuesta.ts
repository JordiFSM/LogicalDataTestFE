/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface que almacena la respuesta de productos de la API.
 */
import { MProducto } from "./mProducto";

export interface MProductoRespuesta {
  estadoRespuesta: number;
  mensaje: string;
  dato: MProducto[];
}