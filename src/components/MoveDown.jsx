import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import "../components/AppDown.css"

const App2 = () => {
  const scrollToBottom = () => {
    scroll.scrollToBottom({ duration: 900, smooth: 'easeInOutQuart' });
  };

  return (
    <div className='asdasd'>
      <button onClick={scrollToBottom}>Desplazarse hacia abajo</button>
      
      {/* Contenido de tu aplicación */}
 

      {/* Otro contenido de tu aplicación */}
    </div>
  );
};

export default App2;