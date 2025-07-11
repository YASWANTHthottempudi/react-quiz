import { useState, useEffect } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ userAnswers, onRestart }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  // Performance rating based on correct answers
  const getPerformanceRating = () => {
    if (correctAnswersShare >= 90) return { rating: 'Excellent!', emoji: '🏆', color: '#FFD700' };
    if (correctAnswersShare >= 80) return { rating: 'Great Job!', emoji: '🌟', color: '#4CAF50' };
    if (correctAnswersShare >= 70) return { rating: 'Good Work!', emoji: '👍', color: '#2196F3' };
    if (correctAnswersShare >= 60) return { rating: 'Not Bad!', emoji: '👌', color: '#FF9800' };
    return { rating: 'Keep Trying!', emoji: '💪', color: '#F44336' };
  };

  const performance = getPerformanceRating();

  // Calculate time taken (mock data - you can pass this as prop)
  const timeSpent = Math.round((userAnswers.length * 10) / 60 * 10) / 10; // Mock calculation

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setAnimateStats(true), 500);
    if (correctAnswersShare >= 80) {
      setTimeout(() => setShowConfetti(true), 1000);
    }
  }, [correctAnswersShare]);

  return (
    <div id="summary" className={showConfetti ? 'confetti-active' : ''}>
      {showConfetti && <div className="confetti"></div>}
      
      <div className="summary-header">
        <img src={quizCompleteImg} alt="Trophy icon" className="trophy-icon" />
        <h2>Quiz Completed!</h2>
        <div className="performance-badge" style={{ backgroundColor: performance.color }}>
          <span className="performance-emoji">{performance.emoji}</span>
          <span className="performance-text">{performance.rating}</span>
        </div>
      </div>

      <div className="quiz-metrics">
        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-value">{timeSpent} min</div>
          <div className="metric-label">Time Spent</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-value">{userAnswers.length}</div>
          <div className="metric-label">Total Questions</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">🎯</div>
          <div className="metric-value">{correctAnswers.length}</div>
          <div className="metric-label">Correct Answers</div>
        </div>
      </div>

      <div id="summary-stats" className={animateStats ? 'animate' : ''}>
        <div className="stat-item skipped">
          <div className="stat-circle">
            <span className="number">{skippedAnswersShare}%</span>
          </div>
          <span className="text">skipped</span>
        </div>
        <div className="stat-item correct">
          <div className="stat-circle">
            <span className="number">{correctAnswersShare}%</span>
          </div>
          <span className="text">answered correctly</span>
        </div>
        <div className="stat-item wrong">
          <div className="stat-circle">
            <span className="number">{wrongAnswersShare}%</span>
          </div>
          <span className="text">answered incorrectly</span>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={onRestart}>
          🔄 Take Quiz Again
        </button>
        <button className="btn btn-secondary" onClick={() => window.print()}>
          🖨️ Print Results
        </button>
        <button 
          className="btn btn-success" 
          onClick={() => {
            const text = `I scored ${correctAnswersShare}% on the React Quiz! 🎉`;
            navigator.share ? navigator.share({title: 'Quiz Results', text}) : 
            navigator.clipboard.writeText(text);
          }}
        >
          📤 Share Results
        </button>
      </div>

      <div className="detailed-results">
        <h3>📝 Detailed Results</h3>
        <ol className="questions-list">
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';

          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index} className="question-item">
              <div className="question-header">
                <h3 className="question-number">{index + 1}</h3>
                <div className={`answer-status ${answer === null ? 'skipped' : answer === QUESTIONS[index].answers[0] ? 'correct' : 'wrong'}`}>
                  {answer === null ? '⏭️' : answer === QUESTIONS[index].answers[0] ? '✅' : '❌'}
                </div>
              </div>
              <p className="question">{QUESTIONS[index].text}</p>
              <div className="answer-section">
                <p className={cssClass}>
                  <strong>Your Answer:</strong> {answer ?? 'Skipped'}
                </p>
                {answer && answer !== QUESTIONS[index].answers[0] && (
                  <p className="correct-answer">
                    <strong>Correct Answer:</strong> {QUESTIONS[index].answers[0]}
                  </p>
                )}
              </div>
            </li>
          );
        })}
        </ol>
      </div>
    </div>
  );
}