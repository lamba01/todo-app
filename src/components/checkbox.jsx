import React from 'react';
import './checkbox.css'; // Import your CSS stylesheet
import checkIcon from '../images/icon-check.svg'; // Import your check icon image

function Checkbox({ checked, onChange }) {
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
      />
      <div className={`checkbox-icon ${checked ? 'checked' : ''}`}>
        <img src={checkIcon} alt="Check Icon" />
      </div>
    </label>
  );
}

export default Checkbox;



