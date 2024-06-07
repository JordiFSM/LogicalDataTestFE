import './App.css';
import { LogIn } from './paginas/login/LogIn';

/**
 * Autor: Jordi Segura
 * Fecha: 6/6/2024
 * Descripción: Funcion App.
 * @returns El App con el Login.
 */
function App() {
  return (
    <div className="app-container"> 
      <LogIn /> 
    </div>
  );
}

export default App;
