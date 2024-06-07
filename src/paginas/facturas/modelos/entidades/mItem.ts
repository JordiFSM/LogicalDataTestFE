/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface del modelo de OrderItem.
 */

export interface MItem {
  id: number,
  ordenId: number,
  productoId: number,
  cantidad: number,
  precio: number,
  total: number,
}