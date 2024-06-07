import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './faq.css';

export default function FAQ() {
  // Create state variables for each section
  const [activeSections, setActiveSections] = useState({});

  // FAQ data
  const faqData = [
    {
      question: "What are gemstones and rudraksha?",
      answer: "Gemstones are natural minerals or rocks that are cut and polished for use in jewelry or other adornments. Rudraksha is a seed traditionally used as prayer beads in Hinduism, especially for meditation."
    },
    {
      question: "How do gemstones and rudraksha work?",
      answer: "Different gemstones and rudraksha are believed to have various metaphysical properties that can affect the wearer's energy, emotions, and well-being."
    },
    {
      question: "How to choose the right gemstone or rudraksha?",
      answer: "It's recommended to consult with an expert or a gemologist who can assess your needs and suggest the most suitable gemstone or rudraksha based on your astrological chart or personal preferences."
    },
    {
      question: "Do gemstones and rudraksha have healing properties?",
      answer: "Many people believe that gemstones and rudraksha have healing properties that can alleviate physical, emotional, and spiritual ailments, although scientific evidence may be limited."
    },
    {
      question: "What is the significance of wearing gemstones and rudraksha?",
      answer: "Wearing gemstones and rudraksha is often associated with attracting positive energy, enhancing specific qualities, and providing protection from negative influences."
    },
    {
      question: "How to care for gemstones and rudraksha?",
      answer: "Gemstones should be cleaned regularly with a soft cloth and mild soap, while rudraksha beads can be wiped with a damp cloth. It's essential to store them separately to prevent scratching or damage."
    },
    {
      question: "What are the different types of gemstones and rudraksha available?",
      answer: "There is a wide variety of gemstones and rudraksha available, each with its unique colors, shapes, and properties, catering to different needs and preferences."
    },
    {
      question: "Can gemstones and rudraksha be worn together?",
      answer: "Yes, gemstones and rudraksha can be worn together, but it's essential to ensure they complement each other energetically and aesthetically."
    },
    {
      question: "How long does it take to see results from wearing gemstones and rudraksha?",
      answer: "The time it takes to experience the effects of wearing gemstones and rudraksha can vary from person to person and depend on factors such as belief, intention, and consistency of wear."
    },
    {
      question: "Can gemstones and rudraksha be worn during meditation or yoga?",
      answer: "Yes, wearing gemstones and rudraksha during meditation or yoga practice is believed to enhance the spiritual experience and deepen the connection with oneself."
    },
    {
      question: "Do gemstones and rudraksha have any religious significance?",
      answer: "Yes, gemstones and rudraksha hold religious significance in various cultures and spiritual traditions, often associated with deities, rituals, and ceremonies."
    },
    {
      question: "What is the difference between natural and synthetic gemstones?",
      answer: "Natural gemstones are formed in the earth's crust over millions of years, while synthetic gemstones are created in laboratories to mimic natural gemstones' appearance and properties. Synthetic gemstones may look like Natural Gemstones but do not offer any astrological benefits."
    },
    {
      question: "Are gemstones and rudraksha certified?",
      answer: "Some gemstones and rudraksha may come with certifications from reputable gemological institutes, ensuring their authenticity and quality."
    },
    {
      question: "What is the return or exchange policy for gemstones and rudraksha?",
      answer: (
        <>
          Kindly check the complete return policy for gemstones and rudraksha <Link to='/return'>here</Link>.
        </>
      )
    }
  ];

  // Function to toggle a specific section
  const toggleCollapsible = (index) => {
    setActiveSections({
      ...activeSections,
      [index]: !activeSections[index]
    });
  };

  return (
    <div className='container faq_accordion'>
      <div className='row'>
        <div className='col-md-12 mb-3'>
          <h2 className="text-center">Frequently Asked Questions</h2>
        </div>
        <div className='col-md-12'>
          <div className="accordion" id="accordionExample">
            {faqData.map((item, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className={`accordion-button ${activeSections[index] ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => toggleCollapsible(index)}
                    aria-expanded={activeSections[index] ? 'true' : 'false'}
                    aria-controls={`collapse${index}`}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className={`accordion-collapse collapse ${activeSections[index] ? 'show' : ''}`}
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
