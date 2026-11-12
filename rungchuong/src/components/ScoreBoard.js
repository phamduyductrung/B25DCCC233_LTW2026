import React from 'react';
const ScoreBoard = ({ score, answers, currentIndex }) => (
  <section className="panel">
    <strong>Điểm: {score}</strong>
    <div className="score-grid">{Array.from({ length: 15 }, (_, i) => {
      const answer = answers.find((item) => item.id === i + 1);
      return <div key={i} className={`score-cell ${answer?.correct ? 'cell-correct' : answer?.lifeline ? 'cell-lifeline' : ''} ${i === currentIndex ? 'cell-current' : ''}`}>{i + 1}</div>;
    })}</div>
  </section>
);
export default ScoreBoard;
