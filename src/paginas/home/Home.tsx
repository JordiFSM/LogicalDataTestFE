import Sidebar from '../../componentes/SideBar/Sidebar';
import Footer from '../../componentes/Footer/Footer2';
import './Home.css';


/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Componente del Home donde se presenta un slidebar.
 * @returns Componente de la página de inicio.
 */
export const Home = () => {
  return (
    <div className='body' style={{ display: 'block', flexDirection: 'row', minHeight: '100vh' }}>
      <Sidebar />
      <Footer />
    </div>
  );
};