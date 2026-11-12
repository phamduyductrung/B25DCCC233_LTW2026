import React from 'react';

const AnswerButton = ({ letter, option, index, selected, status, correct, hidden, onChoose }) => {
  let cls = 'answer';
  if (hidden) cls += ' hidden-answer';
  if (selected === index && status === 'locked') cls += ' chosen';
  if (status === 'revealed' && index === correct) cls += ' correct';
  if (status === 'revealed' && selected === index && selected !== correct) cls += ' wrong';
  return <button className={cls} disabled={status !== 'answering' || hidden} onClick={() => onChoose(index)}>
    {hidden ? '' : `${letter}. ${option}`}
  </button>;
};
export default AnswerButton;
