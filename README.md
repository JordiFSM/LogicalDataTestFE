La aplicacion fue creada en React utilizando Typescript. 

Para manejar las solicitudes a la API, se utiliza Axios, una biblioteca que simplifica la realización de peticiones HTTP. Además, la gestión del estado de la aplicación se realiza mediante Zustand, una biblioteca ligera y flexible que facilita el manejo y actualización del estado de forma eficiente. Esta combinación de tecnologías permite crear una aplicación web robusta y de alto rendimiento, con una gestión del estado centralizada y una comunicación eficiente con el backend.

###Manual de usuario

1. Abrir el proyecto, abrir una terminal desde la carpeta principal. 

2. Es importante verificar que los servicios estén configurados con el puerto correcto para la URL base de la API. Los servicios en la aplicación dependen de una variable de entorno para determinar el puerto en el que la API está funcionando. Esta variable de entorno se define en el archivo .env. Si la API está operando en un puerto diferente al que está actualmente configurado en el archivo .env, es necesario modificar este archivo para reflejar el puerto correcto. Esto asegura que la aplicación pueda comunicarse correctamente con la API, evitando errores de conexión y garantizando el correcto funcionamiento del sistema.
            **** La variable de entorno que se encuentra en el archivo .env es: REACT_APP_API_PORT_BACKEND_LOGICAL_DATA=7105
            -> Aqui cambiaremos el puerto por el puerto que nos genere el API

3. Instalar las dependencias con el comando "npm install" desde la terminal abierta anteriormente.


Al arrancar la aplicación se presentará la pagina de LogIn, aca se deberán agregar las credenciales:

<br/>
<div align="center">
  <img alt="Demo" src="public/assets/ventas.png" />
</div>
<br/>
<br/>
