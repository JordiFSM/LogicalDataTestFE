/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interfaz de la forma de la solicitud para actualizar un producto.
 */
export interface SActualizarProducto {
  id: number;
  codigo: string,
  nombre: string;
  descripcion: string;
  precio: number;
  iva: boolean;
}