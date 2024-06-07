import { create } from 'zustand';
import { Usuario } from './modelos/entidades/mUsuario';
import { servicioLogIn } from './servicios/servicioLogIn';
import { SIniciarSesion } from './modelos/solicitudes/sIniciarSesion';
/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Define los atributos de la página de LogIn.
 */
type PaginaLogInState = {
  usuario?: Usuario;
  credenciales?: SIniciarSesion;
  alertErrorLogin: boolean;
  nombreUsuario: string,
  contraseniaUsuario: string,
  usuarioAutenticado: boolean
  estadoCargando: 'sin-cargar' | 'cargando' | 'error' | 'cargado';
};

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Define las acciones de la página de LogIn.
 */

type PaginaLogInActions = {
  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del modal abierto.
   * @param credenciales Credenciales para el inicio de sesión y establecer usuario.
   */
  establecerUsuario: (credenciales: SIniciarSesion) => Promise<void>;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor de la contraseniaUsuario.
   * @param contrasenia La contraseña del usuario.
   */
  establecerContraseniaUsuario: (valor: string) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor de nombreUsuario.
   * @param valor El nombre de usuario.
   */
  establecerNombreUsuario: (valor: string) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor del alertErrorLogIn.
   * @param valor Valor que indica si se muestra o no el alert.
   */
  establecerAlertErrorLogIn: (valor: boolean) => void;

  /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Establece el valor de autenticado.
   * @param valor Valor que indica si el usuario está autenticado o no.
   */
  establecerAutenticado: (valor: boolean) => void;
};

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Constante que define el estado inicial de la página de LogIn.
 */
const estadoInicial: PaginaLogInState = {
  estadoCargando: 'sin-cargar',
  alertErrorLogin: false,
  nombreUsuario: "",
  contraseniaUsuario: "",
  credenciales: { username: "", contrasenia: "" },
  usuarioAutenticado: false
};

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Objeto constante que define los atributos y acciones de la página de Documento.
 */
export const usePaginaLogIn = create<PaginaLogInState & PaginaLogInActions>(
  (set, get) => ({
    ...estadoInicial,

    establecerUsuario: async (credenciales: SIniciarSesion) => {
      
      set({ estadoCargando: 'cargando'})

      const respuesta = await servicioLogIn.autenticarUsuario(credenciales);

      if (respuesta.respuestaExitosa) {
          set({
            usuario: respuesta.dato,
            alertErrorLogin: false,
            usuarioAutenticado: true,
            estadoCargando: 'cargado'
          });        
      } else {
        set({ alertErrorLogin: true, estadoCargando: 'error' })
      }
      
    },    

    establecerNombreUsuario: (valor: string) => {
      set({ nombreUsuario: valor });
    },

    establecerContraseniaUsuario: (valor: string) => {
      set({ contraseniaUsuario: valor});
    },

    establecerAlertErrorLogIn: (valor: boolean) => {
      set({ alertErrorLogin: valor });
    },

    establecerAutenticado: (valor: boolean) => {
      set({ usuarioAutenticado: valor })
    }

  })
);
