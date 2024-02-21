import { useState, useEffect } from 'react';

import Description from '../Description/Description.jsx';
import Options from '../Options/Options.jsx';
import Feedback from '../Feedback/Feedback.jsx';
import Notification from '../Feedback/Notification.jsx';

const descriptionHeaderText = "Sip Happens Café";
const descriptionText = "Please leave your feedback about our service by selecting one of the options below.";
const noFeedbackText = "No feedback yet";
const KEY = "saved-feedbacks";

export default function App() {
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedbacks = window.localStorage.getItem(KEY);
    if (savedFeedbacks !== null) {
      return JSON.parse(savedFeedbacks);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0
    }
  });

  function updateGoodFeedback() {
    setFeedbacks({
      ...feedbacks,
      good: feedbacks.good + 1
    });
  }

  function updateNeutralFeedback() {
    setFeedbacks({
      ...feedbacks,
      neutral: feedbacks.neutral + 1
    });
  }

  function updateBadFeedback() {
    setFeedbacks({
      ...feedbacks,
      bad: feedbacks.bad + 1
    });
  }  

  function resetFeedbacks() {
    setFeedbacks({
      good: 0,
      neutral: 0,
      bad: 0
    })
  }

  function updateFeedback(feedbackType) {
    switch(feedbackType) {
      case 'good':
        updateGoodFeedback();
        break;
      
      case 'neutral':
        updateNeutralFeedback();
        break;

      case 'bad':
        updateBadFeedback();
        break;

      default: console.log('something is wrong!');
    }
  }

  const totalFeedbacks = feedbacks.good + feedbacks.neutral + feedbacks.bad;

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(feedbacks));
  }, [feedbacks]);

  return (
    <>
      <Description 
        headerText={descriptionHeaderText}
        descriptionText={descriptionText}
      />
      <Options 
        feedbacks={feedbacks} 
        onUpdate={updateFeedback} 
        onReset={resetFeedbacks}
        totalFeedbacks={totalFeedbacks}
      />
      {totalFeedbacks > 0 
        ? 
        <Feedback 
          feedbacks={feedbacks} 
          totalFeedbacks={totalFeedbacks} 
        />
        :
        <Notification 
          notificationText={noFeedbackText}
        />
      }
    </>
  )
}


