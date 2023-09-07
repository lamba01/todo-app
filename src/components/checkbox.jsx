

// import React, { useState } from "react";
// import "./checkbox.css";


// const Checkbox = () => {
//   const [isChecked, setIsChecked] = useState(false);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   return (
//     <div className="checkbox-container">
//       <input
//         type="checkbox"
//         className="checkbox-input"
//         checked={isChecked}
//         onChange={handleCheckboxChange}
//       />
//       <span className="checkbox-checkmark"></span>
//     </div>
//   );
// };

// export default Checkbox;

// import React from 'react';
// import './checkbox.css'; // Import your CSS stylesheet

// function Checkbox({ checked, onChange }) {
//   return (
//     <label className="custom-checkbox">
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={onChange}
//         className="checkbox-input"
//       />
//       <span className="checkmark"></span>
//     </label>
//   );
// }

// export default Checkbox;


import React, { useState } from 'react';
import './checkbox.css'; // Import your CSS stylesheet
import checkIcon from '../images/icon-cross.svg'; // Import your check icon image

function Checkbox() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
        className="checkbox-input"
      />
      <div className="checkbox-icon">
        {isChecked && <img src={checkIcon} alt="Check Icon" />}
      </div>
    </label>
  );
}

export default Checkbox;


