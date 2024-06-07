/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface del modelo de Producto.
 */
export interface MProducto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  iva: boolean;
}