import React from 'react';

const History = ({ history, setHistory }) => {
  const sorted = [...history].sort((a, b) => b.score - a.score);
  const count = history.length;
  const highest = count ? Math.max(...history.map((item) => item.score)) : 0;
  const average = count ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / count) : 0;
  return <section className="panel">
    <div className="history-head"><h1>Lịch sử lượt chơi</h1><button className="danger-button" disabled={!count} onClick={() => setHistory([])}>Xóa lịch sử</button></div>
    <div className="stats"><div>Số lượt chơi: <strong>{count}</strong></div><div>Điểm cao nhất: <strong>{count ? highest : '—'}</strong></div><div>Điểm trung bình: <strong>{count ? average : '—'}</strong></div></div>
    {!count ? <p>Chưa có lượt chơi nào</p> : <div className="table-wrap"><table><thead><tr><th>Người chơi</th><th>Số câu đúng</th><th>Điểm</th><th>Danh hiệu</th><th>Thời gian</th></tr></thead><tbody>
      {sorted.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.correctCount}</td><td>{item.score}</td><td>{item.rank}</td><td>{item.playedAt}</td></tr>)}
    </tbody></table></div>}
  </section>;
};
export default History;
