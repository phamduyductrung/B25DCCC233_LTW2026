import React from 'react';
const Timer = ({ time }) => <div className={`timer ${time <= 5 ? 'danger' : ''}`}>Còn {time} giây</div>;
export default Timer;
