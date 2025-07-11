import { useState, useCallback, useEffect } from 'react';

import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStartTime] = useState(Date.now());
  const [currentScore, setCurrentScore] = useState(0);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // Calculate current score
  useEffect(() => {
    const correctAnswers = userAnswers.filter((answer, index) => {
      return answer && answer === QUESTIONS[index]?.answers[0];
    }).length;
    setCurrentScore(correctAnswers);
  }, [userAnswers]);

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer,
    timeSpent
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  const handleRestartQuiz = useCallback(() => {
    setUserAnswers([]);
    setCurrentScore(0);
  }, []);

  if (quizIsComplete) {
    return (
      <Summary 
        userAnswers={userAnswers} 
        quizStartTime={quizStartTime}
        onRestart={handleRestartQuiz}
      />
    );
  }

  return (
    <div id="quiz">
      <div className="quiz-progress">
        <div className="progress-indicator">
          <div 
            className="progress-bar" 
            style={{ width: `${(activeQuestionIndex / QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
        <div className="score-display">
          Score: {currentScore}/{QUESTIONS.length}
        </div>
      </div>
      
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}