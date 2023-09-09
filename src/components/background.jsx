import React from 'react';
import './background.css'; // Import your CSS stylesheet
import backgroundImage from '../images/bg-desktop-dark.jpg'; // Import the dark mode background image

function Background() {
 

  return (
    <div className='background'>
    <div className={`background-image`} 
      style={{  backgroundImage: `url(${backgroundImage})` }}
    ><div className="text"></div></div>
     <div className='background-color'></div>     
    </div>
  );
}

export default Background;
