import React from 'react';
import './Footer2.css';
import { LinkedIn, Facebook, Instagram, WhatsApp } from '@mui/icons-material'; // Asegúrate de tener estos iconos importados

const Footer = () => {
  return (
    <footer className="footer">
      <div className="column">
        <img src="assets\LD-logo.webp" alt="Logical Data" className="logo" />
        <p>Líder en soluciones tecnológicas para aumentar la rentabilidad de negocios y liderazgo de sus clientes.</p>
        <div className="social-icons">
          <a href="#"><LinkedIn /></a>
          <a href="#"><Facebook /></a>
          <a href="#"><Instagram /></a>
          <a href="#"><WhatsApp /></a>
        </div>
        <div className="contact-info">
          <p>Lun-Vie: 8:00 – 17:00</p>
          <a href="mailto:mercadeo@ld.co.cr">
            mercadeo@ld.co.cr
          </a>
        </div>
      </div>
      <div className="column">
        <h3>NUESTRAS OFICINAS</h3>
        <p><strong>Costa Rica</strong><br />Torre del Este, Piso 6. Frente a la Facultad de Derecho de la UCR, San Pedro de Montes de Oca.<br />+506 4052-2780</p>
        <p><strong>México</strong><br />Avenida Insurgentes sur #716 Piso 7, Col. Del Valle Código postal 03100 Delegación Benito Juárez<br />+52 55 5282-2545</p>
        <p><strong>Nicaragua</strong><br />Plaza Bolívar No. 8. de los Semáforos de ENEL Central, 400 metros al lago, Managua<br />+505 8202-4642</p>
      </div>
      <div className="column">
        <h3>SERVICIOS</h3>
        <a href="#">SAP Business One</a>
        <a href="#">LDCOM</a>
        <a href="#">Microsoft Defender</a>
        <a href="#">Microsoft Azure</a>
        <a href="#">Microsoft 365</a>
        <a href="#">Microsoft Dynamics</a>
        <a href="#">Microsoft Power BI</a>
        <a href="#">Oracle ERP Cloud</a>
        <a href="#">Blog</a>
        <a href="#">Podcasts</a>
        <a href="#">e-Books</a>
      </div>
      <div className="column">
        <h3>ÚLTIMOS ARTÍCULOS</h3>
        <p><a href="#">Visualice el futuro de su empresa en la nube</a><br />13/02/2023</p>
        <p><a href="#">Aumente sus ingresos en 2023 con estas tres áreas de negocio</a><br />08/02/2023</p>
        <p><a href="#">Estrategia retail de distribución: Venda donde compran sus clientes (2023)</a><br />25/01/2023</p>
      </div>
    </footer>
  );
}

export default Footer;
