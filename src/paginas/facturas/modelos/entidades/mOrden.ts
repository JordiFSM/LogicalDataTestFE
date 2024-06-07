
import { MItem } from "./mItem";
/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface del modelo de OrderItem.
 */
export interface MOrden {
  orden: number;
  usuarioId: number,
  id: number;
  fecha: Date;
  total: number;
  items: MItem[];
}