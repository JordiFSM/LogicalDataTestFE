import './Sidebar.css';
import Item from '../Item/Item';
import { Links } from '../../data/Links';

/**
 * Autor: Jordi Segura
 * Fecha: 6/6/2024
 * Descripción: Componente del Sidebar.
 * @returns Componente del sidebar.
 */
const Sidebar = () => {

  return (
    <div className={"sidebarOpen"}>
      <svg
        className={"hamburger"}
        viewBox="0 0 18 12"
      >

        <path
          d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"
          fill="#8F8F8F"
        />
        
      </svg>
      <div className={"linksContainer"}>
        {Links &&
          Links.map (({to, text, index}) => (
            <Item key={index} to={to} text={text} open={true}  />
            
          ))}
      </div>
    </div>
  );
};

export default Sidebar;