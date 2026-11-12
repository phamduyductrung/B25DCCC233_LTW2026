import React from 'react';
import { LEVELS, LETTERS } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({ question, index, selected, status, hiddenOptions, onChoose }) => (
  <section className="panel">
    <div className="muted">Câu {index + 1}/15 · {question.topic} · {LEVELS[question.level]}</div>
    <h2>{question.question}</h2>
    <div className="answer-grid">
      {question.options.map((option, i) => (
        <AnswerButton key={i} letter={LETTERS[i]} option={option} index={i}
          selected={selected} status={status} correct={question.answer}
          hidden={hiddenOptions.includes(i)} onChoose={onChoose} />
      ))}
    </div>
  </section>
);
export default QuestionCard;
