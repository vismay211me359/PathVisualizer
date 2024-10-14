import React, { useState } from 'react'
import NavBar from './components/NavBar'
import Grid from './components/Grid'

const App = () => {

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const toggleNavbar = () => {
    const element = document.getElementById("thenavbar");
    let height = element.offsetHeight;
    const mover = document.getElementById("thefather");
    // let translateYValue = `-${height}px`;
    // mover.classList.toggle(`translate-y-[${translateYValue}]`);
    if (!isNavbarVisible) {
      mover.style.transform = 'translateY(0px)';
    } else {
      mover.style.transform = `translateY(-${height}px)`;
    }
    setIsNavbarVisible(!isNavbarVisible);
  };
  return (
    <div id='thefather' className='relative overflow-hidden transition-transform duration-500 ease-in-out'>
      <div id="thenavbar" >
        <NavBar isVisible={isNavbarVisible} />
      </div>
      <div>
        <Grid toggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />
      </div>
    </div>
  )
}

export default App
