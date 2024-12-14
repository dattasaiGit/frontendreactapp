import { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      category: 'Student Profile',
      questions: [
        {
          question: 'How do I create my profile in the Placement Management System?',
          answer: 'Log in to the system, navigate to the Profile section, and fill out all required fields including personal details, academic information, skills, projects, and internship experiences. Ensure all information is accurate and up-to-date.'
        },
        {
          question: 'What documents should I upload to my profile?',
          answer: 'Upload your resume, academic transcripts, internship certificates, project reports, skill certifications, and any other relevant documents that showcase your abilities and achievements.'
        }
      ]
    },
    {
      category: 'Job Applications',
      questions: [
        {
          question: 'How can I apply for job opportunities through the system?',
          answer: 'Browse available job openings, review the job requirements, and click on the "Apply" button. The system will automatically send your profile to the recruiting company based on your eligibility and profile match.'
        },
        {
          question: 'Can I track my job application status?',
          answer: 'Yes, you can track your application status in the "My Applications" section. The system provides real-time updates on whether your application is under review, shortlisted, or rejected.'
        }
      ]
    },
    {
      category: 'Skill Development',
      questions: [
        {
          question: 'Does the system offer skill enhancement resources?',
          answer: 'The Placement Management System provides access to online learning modules, skill assessment tests, practice interviews, and recommended courses to help you improve your employability.'
        },
        {
          question: 'How are my skills evaluated in the system?',
          answer: 'Your skills are evaluated through self-assessment, online skill tests, project complexity, certifications, and feedback from previous internships or academic projects.'
        }
      ]
    },
    {
      category: 'Interview Preparation',
      questions: [
        {
          question: 'What interview preparation tools are available?',
          answer: 'The system offers mock interview sessions, video interview practice, technical skill assessments, company-specific interview guides, and performance analytics to help you prepare effectively.'
        },
        {
          question: 'Can I schedule mock interviews through the system?',
          answer: 'Yes, you can schedule mock interviews with placement counselors, select specific interview types (technical, HR, aptitude), and receive detailed feedback on your performance.'
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
