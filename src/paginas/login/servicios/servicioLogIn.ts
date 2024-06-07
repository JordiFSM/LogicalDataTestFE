import axios from 'axios';
import { MRespuesta } from '../../../modelos/mRespuesta';
import { Usuario } from '../modelos/entidades/mUsuario';
import { MAutenticacionRespuesta } from '../modelos/entidades/mAutenticacionRespuesta';
import * as Textos from '../../../constantes/Constantes';
import { SIniciarSesion } from '../modelos/solicitudes/sIniciarSesion';

const { REACT_APP_API_PORT_BACKEND_LOGICAL_DATA } = process.env;
const END_POINT_BACKEND: string = `https://localhost:${REACT_APP_API_PORT_BACKEND_LOGICAL_DATA}/api/Usuario/`;

export const servicioLogIn = {

    /**
   * Autor: Jordi Segura Madrigal
   * Fecha: 6/6/2024
   * Descripción: Autentica un usuario.
   * @returns El usuario autenticado y un token JWT.
   */
  autenticarUsuario: async (credenciales: SIniciarSesion) => {
    let respuestaFinal: MRespuesta<Usuario> = new MRespuesta<Usuario>();
    try {
        await axios
        .post<MAutenticacionRespuesta>(`${END_POINT_BACKEND}AutenticarUsuario`, credenciales)
        .then((res) => {
          respuestaFinal.dato = res.data.dato.usuario;
          respuestaFinal.respuestaExitosa = true;

          localStorage.setItem('token', res.data.dato.token);
          localStorage.setItem('id', res.data.dato.usuario.id.toString());
          localStorage.setItem('username', res.data.dato.usuario.username);
          localStorage.setItem('nombre', res.data.dato.usuario.nombre);
          localStorage.setItem('apellido', res.data.dato.usuario.apellido);
          
        });

    } catch (error: any) {
      respuestaFinal.mensaje = Textos.ERROR_AUTENTICANDO;
      respuestaFinal.respuestaExitosa = false;
    }

    return respuestaFinal;
  },
};
