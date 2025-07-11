import { useState, useEffect } from 'react';

import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import QUESTIONS from '../questions.js';

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });
  const [showHint, setShowHint] = useState(false);
  const [questionStartTime] = useState(Date.now());

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  // Show hint after 7 seconds if no answer selected
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      if (!answer.selectedAnswer) {
        setShowHint(true);
      }
    }, 7000);

    return () => clearTimeout(hintTimer);
  }, [answer.selectedAnswer]);

  function handleSelectAnswer(answer) {
    const timeSpent = Date.now() - questionStartTime;
    
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer, timeSpent);
      }, 2000);
    }, 1000);
  }

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question" className={`question-container ${answerState}`}>
      <div className="question-header">
        <p id="question-overview">
          Question {index + 1} of {QUESTIONS.length}
        </p>
        <div className="question-difficulty">
          {QUESTIONS[index].difficulty && (
            <span className={`difficulty ${QUESTIONS[index].difficulty}`}>
              {QUESTIONS[index].difficulty.toUpperCase()}
            </span>
          )}
        </div>
      </div>
      
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      
      <div className="question-content">
        <h2>{QUESTIONS[index].text}</h2>
        
        {showHint && !answer.selectedAnswer && QUESTIONS[index].hint && (
          <div className="hint-box">
            <div className="hint-icon">💡</div>
            <p><strong>Hint:</strong> {QUESTIONS[index].hint}</p>
          </div>
        )}
      </div>
      
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
      
      {answer.isCorrect !== null && (
        <div className={`feedback ${answer.isCorrect ? 'correct' : 'wrong'}`}>
          <div className="feedback-icon">
            {answer.isCorrect ? '🎉' : '😔'}
          </div>
          <p>
            {answer.isCorrect 
              ? 'Excellent! That\'s correct!' 
              : `Oops! The correct answer was: ${QUESTIONS[index].answers[0]}`
            }
          </p>
          {QUESTIONS[index].explanation && (
            <div className="explanation">
              <strong>Explanation:</strong> {QUESTIONS[index].explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}