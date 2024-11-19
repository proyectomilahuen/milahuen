import React from 'react';
import  FloatingButton from '../components/FloatingButton' ;
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <section className="about-us">
      <h2 className="about-us__title">Quiénes Somos</h2>
      
      <div className="about-us__content">
        <div className="about-us__section">
          <h3 className="about-us__subtitle">Misión</h3>
          <p className="about-us__text">
            En Milahuén apuntamos a promover un estilo de vida sostenible a través de la venta de productos envasados y a granel, ofreciendo alternativas de consumo que minimicen el desperdicio y fortalezcan nuestra comunidad. Nos esforzamos por inspirar hábitos de compra responsables, reduciendo la huella ambiental y fomentando la reutilización de nuestros envases como parte esencial de un cambio positivo.
          </p>
          <p className="about-us__text">
            Colaboramos para reducir los desechos de un solo uso y promover los envases retornables y la extensión de la vida útil de estos, entregando un flujo de retorno accesible para todos.
          </p>
          <p className="about-us__text">
            Con la misma importancia en el foco ambiental, nos comprometemos a trabajar de la mano con mujeres, en especial madres, brindándoles oportunidades de desarrollo y apoyo en su rol fundamental dentro de la sociedad. Creemos en el poder de la inclusión económica y en el impacto positivo que cada una de ellas puede generar cuando tienen acceso a un entorno de trabajo justo, flexible y respetuoso con la vida familiar.
          </p>
        </div>
        
        <div className="about-us__section">
          <h3 className="about-us__subtitle">Visión</h3>
          <p className="about-us__text">
            Queremos liderar un movimiento de consumo consciente en nuestra región, inspirando a cada persona a repensar la manera en que consume y elige productos que no solo alimenten el cuerpo, sino también la conciencia. En Milahuén, ofrecemos productos a granel y fomentamos el uso de envases retornables para minimizar el desperdicio y promover la extensión de vida útil de estos.
          </p>
          <p className="about-us__text">
            Anhelamos construir una red de apoyo y oportunidades para mujeres, promoviendo su inclusión económica y profesional, y creando un ambiente de trabajo que nos permita conciliar nuestras responsabilidades familiares. Valoramos el impacto que tienen las madres en la sociedad y reconocemos que al apoyarlas estamos no solo fortaleciendo sus vidas, sino también las de sus hijos y comunidades.
          </p>
          <p className="about-us__text">
            Aspiramos a que cada cliente de Milahuén se convierta en un embajador de la sostenibilidad e inclusión, dos conceptos que encontrarás de manera tangible en Milahuén.
          </p>
        </div>
        <FloatingButton />
      </div>
    </section>
  );
}

export default AboutUs;
