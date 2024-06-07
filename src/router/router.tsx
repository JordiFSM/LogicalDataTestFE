import { createBrowserRouter } from 'react-router-dom';
import { LogIn } from '../paginas/login/LogIn';
import { Ventas } from '../paginas/ventas/Ventas';
import { Home } from '../paginas/home/Home';

import { Facturas } from '../paginas/facturas/Facturas';

/**
 * Autor: Jordi Segura
 * Fecha: 6/6/2024
 * Descripción: Almacena las rutas de navegacion.
 * @returns el router con las rutas de navegacion
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LogIn />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/Ventas',
    element: <Ventas />,
  },
  {
    path: '/Facturacion',
    element: <Facturas />,
  },
]);