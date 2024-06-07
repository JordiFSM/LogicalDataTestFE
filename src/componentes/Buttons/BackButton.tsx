import React from 'react';
import { NavLink } from 'react-router-dom';
import './BackButton.css'; 

interface BackButtonProps {
  route: string;
}

const BackButton: React.FC<BackButtonProps> = ({ route }) => {
  return (
    <NavLink to={route} className="back-button">
      <button className="back-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="none" />
          <path d="M9 12h6m-3 0-3-3m3 3-3 3" stroke="black" strokeWidth="2" fill="none" />
        </svg>
        Regresar
      </button>
    </NavLink>
  );
};

export default BackButton;
