import React from 'react';
const Helpers = ({ used, onHide, onExtra, onLifeline, lifeline, canUse }) => (
  <section className="helpers">
    <button disabled={!canUse || used.hide} onClick={onHide}>Loại 1 đáp án {used.hide ? '(Đã dùng)' : ''}</button>
    <button disabled={!canUse || used.extra} onClick={onExtra}>Thêm 15 giây {used.extra ? '(Đã dùng)' : ''}</button>
    <button disabled={!canUse || used.lifeline} onClick={onLifeline}>{lifeline ? 'Phao đang bật' : 'Phao cứu sinh'} {used.lifeline ? '(Đã dùng)' : ''}</button>
  </section>
);
export default Helpers;
