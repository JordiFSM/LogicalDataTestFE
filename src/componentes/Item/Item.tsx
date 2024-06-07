import './Item.css';

import {NavLink} from 'react-router-dom';

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Componente Item donde se presentan los 2 sub menus a elegir.
 * @returns Componente de los submenues a presentar en el slidebar.
 */
const Item = ( props : any ) => {
  return (
    <NavLink to={props.to} className={props.open ? "linkOpen" : "normal"}>      
      {props.open ? <p>{props.text}</p> : null}
    </NavLink>
  );
};

export default Item;