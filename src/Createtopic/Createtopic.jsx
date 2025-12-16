
import { useState } from "react";
import "./Createtopic.css";
import { useNavigate } from "react-router-dom";

function Createtopic() {
  const [topicName, setTopicName] = useState("");
  const [reason, setReason] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    const userId = localStorage.getItem('currentUserId');
    if(!userId){ alert('Please login'); return; }
    const topics = JSON.parse(localStorage.getItem('topics')||'[]');
    topics.unshift({ id, userId: Number(userId), topicName, reason, createdAt: new Date().toISOString() });
    localStorage.setItem('topics', JSON.stringify(topics));
    setTopicName("");
    setReason("");
    nav('/Topics');
  };

  return (
    <div className="topic-container">
      <div className="topic-form">
        <h2>Create Topic</h2>
        <form onSubmit={handleSubmit}>
          <label>Topic name</label><br/>
          <input
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            required
          /><br />
          <label>Reason</label><br/>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          /><br />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default Createtopic;
