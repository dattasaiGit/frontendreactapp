import { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      category: 'Placement Process',
      questions: [
        {
          question: 'What is the placement process?',
          answer: 'The placement process is a comprehensive approach to help students find suitable job opportunities. It typically involves resume preparation, skill assessment, company presentations, written tests, technical interviews, and final HR interviews.'
        },
        {
          question: 'How can I prepare for placements?',
          answer: 'Prepare by improving your technical skills, practicing coding, working on projects, maintaining a good academic record, developing soft skills, and participating in mock interviews and placement workshops.'
        }
      ]
    },
    {
      category: 'Placement Office',
      questions: [
        {
          question: 'What does the Placement Officer do?',
          answer: 'The Placement Officer coordinates job opportunities, organizes campus recruitment drives, maintains relationships with companies, provides career guidance, and helps students prepare for job interviews.'
        },
        {
          question: 'How can I get assistance from the Placement Office?',
          answer: 'You can schedule consultations, attend placement preparation sessions, get resume reviews, receive interview tips, and stay updated on job opportunities through the Placement Office.'
        }
      ]
    },
    {
      category: 'Company Interviews',
      questions: [
        {
          question: 'What types of interviews do companies conduct?',
          answer: 'Companies typically conduct multiple interview rounds including aptitude tests, technical interviews, coding assessments, group discussions, and final HR interviews to evaluate candidates comprehensively.'
        },
        {
          question: 'How should I dress for placement interviews?',
          answer: 'Dress professionally in formal attire. For most corporate interviews, wear a well-fitted suit or professional business wear. Ensure your clothes are clean, pressed, and appropriate for a professional setting.'
        }
      ]
    }
  ];

  const toggleFaq = (categoryIndex, questionIndex) => {
    const newIndex = activeIndex === `${categoryIndex}-${questionIndex}` 
      ? null 
      : `${categoryIndex}-${questionIndex}`;
    setActiveIndex(newIndex);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      
      {faqData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="faq-category">
          <h2 className="faq-category-title">{category.category}</h2>
          
          {category.questions.map((faq, questionIndex) => (
            <div 
              key={questionIndex} 
              className={`faq-card ${
                activeIndex === `${categoryIndex}-${questionIndex}` ? 'active' : ''
              }`}
            >
              <div 
                className="faq-question"
                onClick={() => toggleFaq(categoryIndex, questionIndex)}
              >
                <h3 className="faq-question-text">{faq.question}</h3>
                <span className="faq-toggle-icon">
                  {activeIndex === `${categoryIndex}-${questionIndex}` ? '−' : '+'}
                </span>
              </div>
              
              {activeIndex === `${categoryIndex}-${questionIndex}` && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Faq;