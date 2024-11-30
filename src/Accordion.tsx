import { useState } from 'react';
import background from './assets/background-pattern-desktop.svg';
import iconstar from './assets/icon-star.svg';
import iconminus from './assets/icon-minus.svg';
import iconplus from './assets/icon-plus.svg';

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
        if (clickedIndex !== index) {
            setClickedIndex(index);
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleClick(index);
            event.preventDefault(); // Prevent scrolling when space is pressed
        } else if (event.key === 'ArrowDown') {
            event.preventDefault(); // Prevent default scrolling
            const nextIndex = (index + 1) % faqs.length; // Loop back to the start
            document.getElementById(`faq-question-${nextIndex}`).focus(); // Focus next question
        } else if (event.key === 'ArrowUp') {
            event.preventDefault(); // Prevent default scrolling
            const prevIndex = (index - 1 + faqs.length) % faqs.length; // Loop back to the end
            document.getElementById(`faq-question-${prevIndex}`).focus(); // Focus previous question
        }
    };

    const faqs = [
        {
            question: "What is Frontend Mentor, and how will it help me?",
            answer: "Frontend Mentor offers real-world coding challenges with design files for practicing HTML, CSS, and JavaScript. It helps you improve your skills, build a portfolio, and gain practical experience in frontend development."
        },
        {
            question: "How do I get started with Frontend Mentor?",
            answer: "You can start by creating an account on the Frontend Mentor website. Once registered, you can choose from various challenges based on your skill level."
        },
        {
            question: "What technologies do I need to complete the challenges?",
            answer: "You can use any technologies you prefer, but most challenges require knowledge of HTML, CSS, and JavaScript."
        },
        {
            question: "Can I use frameworks like React or Vue?",
            answer: "Yes, you can use any framework you like! The challenges are designed to be flexible."
        }
    ];

    return (
        <div className='relative min-h-screen bg-[hsl(275,100%,97%)]'>
            <img className='w-full' src={background} alt="Background" />
            <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-full max-w-[500px] bg-white flex items-center justify-center mt-[20px] z-10 relative mx-4 rounded-lg shadow-lg'>
                    <div className='m-4 leading-10 pt-[80px]'>
                        <img className='absolute top-[20px] left-0 m-4 w-8 h-8' src={iconstar} alt="Star Icon" />
                        <h1 className='absolute top-[15px] left-[58px] m-4 font-bold text-4xl md:text-5xl'>FAQs</h1>
                        {faqs.map((faq, index) => (
                            <div key={index} className='mb-4'>
                                <p
                                    id={`faq-question-${index}`} // Unique ID for each question
                                    className='flex items-center justify-between cursor-pointer'
                                    onClick={() => handleClick(index)}
                                    onKeyDown={(event) => handleKeyDown(event, index)}
                                    tabIndex={0} // Make the element focusable
                                    role="button" // Indicate that this element acts like a button
                                    aria-expanded={activeIndex === index} // Accessibility attribute
                                    aria-controls={`faq-answer-${index}`} // Link to the answer
                                >
                                    <span className={clickedIndex === index ? "text-purple-500" : "text-black"}>{faq.question}</span>
                                    <img className='w-5 h-5 ml-2' src={activeIndex === index ? iconminus : iconplus} alt={activeIndex === index ? "Hide" : "Show"} />
                                </p>
                                {activeIndex === index && (
                                    <div id={`faq-answer-${index}`} className='border border-gray-300 p-4 mt-2'>
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
