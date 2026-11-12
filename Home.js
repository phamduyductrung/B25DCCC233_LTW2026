import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();
  const record = [...history].sort((a, b) => b.score - a.score)[0];
  const handleNameChange = (e) => setPlayerName(e.target.value);
  return <div className="hero panel">
    <div className="eyebrow">THỬ THÁCH KIẾN THỨC WEB</div>
    <h1>Rung chuông vàng</h1>
    <p>15 câu hỏi về HTML, CSS, JavaScript và React. Mỗi câu có 20 giây. Trả lời sai hoặc hết giờ sẽ bị loại, hãy sử dụng 3 quyền trợ giúp thật hợp lý!</p>
    <ul className="rules"><li>Câu dễ: 10 điểm · Trung bình: 20 điểm · Khó: 30 điểm</li><li>Trả lời đúng cả 15 câu: 300 điểm và rung chuông vàng.</li><li>Có 3 quyền trợ giúp, mỗi quyền dùng một lần.</li></ul>
    <label>Tên người chơi</label>
    <input value={playerName} onChange={handleNameChange} placeholder="Nhập tên của bạn..." />
    <button className="primary" disabled={!playerName.trim()} onClick={() => navigate('/play')}>Vào thi</button>
    {record && <p className="record">Kỷ lục: {record.score} điểm – {record.name}</p>}
  </div>;
};
export default Home;
