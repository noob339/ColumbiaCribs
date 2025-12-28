import React from 'react'
import './FAQs.css'

function FAQs() {
    return (
        <div className="faq-container">
          <h1 className="faq-title">FAQs</h1>
          
          <div className="faq-item">
            <h2 className="faq-question">What information should I include in a review?</h2>
            <p className="faq-answer">
              A review could include anything you would want to know about that building — pros, cons, 
              cleanliness, distance from campus, safety, etc. Tell us how you enjoyed living in the building 
              (or not), and compare it to previous buildings you have lived 
              in at Columbia. Please avoid writing only vague, subjective statements like 
              "This building was great!" or "AVOID LIKE THE PLAGUE!!!" Comments like these provide little 
              actual substance about your experience with your building experience, and are not the most useful 
              for other students.
            </p>
          </div>
    
          <div className="faq-item">
            <h2 className="faq-question">How often does CU Cribs update?</h2>
            <p className="faq-answer">
              We receive submissions all year round and post them as soon as practicable. It may be the case 
              that a particular professor or course has not been updated for the past semester. Our 
              experience is that incoming reviews are distributed among thousands of professors and 
              courses at Columbia, and as such, only a few of the reviews are allocated to a given professor 
              or course every semester.
            </p>
          </div>
        </div>
      );
}

export default FAQs
