/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interfaz de la forma de la solicitud para agregar un producto.
 */
export interface SAgregarProducto {
  nombre: string;
  descripcion: string;
  precio: number;
  iva: boolean;
}