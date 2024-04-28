import React, { useState } from 'react';
import './faq.css';

export default function FAQ() {
  // Create state variables for each section
  const [activeSections, setActiveSections] = useState({});

  // Function to toggle a specific section
  const toggleCollapsible = (index) => {
    setActiveSections({
      ...activeSections,
      [index]: !activeSections[index]
    });
  };

  return (
    <div>
      <p>FAQs:</p>
      {[...Array(5).keys()].map((index) => (
        <div key={index}>
          <button
            className={`collapsible ${activeSections[index] ? 'active' : ''}`}
            onClick={() => toggleCollapsible(index)}
          >
            Toggle Collapsible
          </button>
          <div className="content" style={{ display: activeSections[index] ? 'block' : 'none' }}>
            {/* Your collapsible content goes here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ligula vel magna feugiat faucibus.
          </div>
        </div>
      ))}
    </div>
  );
}
