
import './Topics.css';
import { useState, useEffect } from 'react';

function Topics() {
  const [topics,setTopics]=useState([]);
  const [commentMap,setCommentMap]=useState({}); // topicId -> input
  const [comments,setComments]=useState([]);

  useEffect(()=>{
    setTopics(JSON.parse(localStorage.getItem('topics')||'[]'));
    setComments(JSON.parse(localStorage.getItem('comments')||'[]'));
  },[]);

  const getUser = (id) => {
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    return users.find(u=>u.id===id) || {name:'Unknown'};
  };

  const handleComment = (topicId) => {
    const text = commentMap[topicId];
    const userId = localStorage.getItem('currentUserId');
    if(!userId){ alert('Please login to comment'); return; }
    if(!text) return;
    const all = JSON.parse(localStorage.getItem('comments')||'[]');
    const c = { id: Date.now(), topicId, userId: Number(userId), text, createdAt: new Date().toISOString() };
    all.push(c);
    localStorage.setItem('comments', JSON.stringify(all));
    setComments(all);
    setCommentMap({...commentMap, [topicId]: ''});
  };

  return (
    <div className="TopicsContainer">
      <h1>Topics</h1>
      {topics.length===0 && <p>No topics yet. Create one.</p>}
      {topics.map(topic=>(
        <div key={topic.id} className="TopicCard">
          <h2>Topic: {topic.topicName}</h2>
          <h3>Reason: {topic.reason}</h3>
          <small>By: {getUser(topic.userId).name}</small>
          <div style={{marginTop:8}}>
            <input value={commentMap[topic.id]||''} onChange={e=>setCommentMap({...commentMap, [topic.id]: e.target.value})} type="text" placeholder="Write your comment..." />
            <button onClick={()=>handleComment(topic.id)} style={{marginLeft:8}}>Comment</button>
          </div>
          <div style={{marginTop:10}}>
            <strong>Comments:</strong>
            {(comments.filter(c=>c.topicId===topic.id)||[]).map(c=>(
              <div key={c.id} style={{borderTop:'1px solid #eee', paddingTop:6}}>
                <small>{getUser(c.userId).name}:</small> {c.text}
              </div>
            ))}
            {comments.filter(c=>c.topicId===topic.id).length===0 && <div><em>No comments</em></div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Topics;
