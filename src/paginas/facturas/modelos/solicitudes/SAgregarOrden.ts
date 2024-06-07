
import { SItem } from "./SItem";
import { SOrden } from "./SOrden";

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface del modelo de solicitud para registrar una orden.
 */
export interface SAgregarOrden {
  orden: SOrden,
  items: SItem[]
}