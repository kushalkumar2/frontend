
import "./Mycontent.css";
import { useState, useEffect } from "react";

const MyContent = () => {
  const [topics,setTopics]=useState([]);
  const [comments,setComments]=useState([]);
  const [editTopicId,setEditTopicId]=useState(null);
  const [editTopicName,setEditTopicName]=useState('');
  const [editReason,setEditReason]=useState('');
  const [editCommentId,setEditCommentId]=useState(null);
  const [editCommentText,setEditCommentText]=useState('');

  useEffect(()=>{
    setTopics(JSON.parse(localStorage.getItem('topics')||'[]'));
    setComments(JSON.parse(localStorage.getItem('comments')||'[]'));
  },[]);

  const userId = Number(localStorage.getItem('currentUserId'));

  const myTopics = topics.filter(t=>t.userId===userId);
  const myComments = comments.filter(c=>c.userId===userId);

  const saveTopic = (id)=>{
    const updated = topics.map(t=> t.id===id ? {...t, topicName: editTopicName, reason: editReason} : t);
    localStorage.setItem('topics', JSON.stringify(updated));
    setTopics(updated);
    setEditTopicId(null);
  };

  const deleteTopic = (id)=>{
    const updated = topics.filter(t=>t.id!==id);
    const updatedComments = comments.filter(c=>c.topicId!==id);
    localStorage.setItem('topics', JSON.stringify(updated));
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setTopics(updated);
    setComments(updatedComments);
  };

  const saveComment = (id)=>{
    const updated = comments.map(c=> c.id===id ? {...c, text: editCommentText} : c);
    localStorage.setItem('comments', JSON.stringify(updated));
    setComments(updated);
    setEditCommentId(null);
  };

  const deleteComment = (id)=>{
    const updated = comments.filter(c=>c.id!==id);
    localStorage.setItem('comments', JSON.stringify(updated));
    setComments(updated);
  };

  return (
    <div className="mycontent-container">
      <h1>My Content</h1>
      <h2>My Topics</h2>
      {myTopics.length===0 && <p>No topics created by you.</p>}
      <table>
        <thead><tr><th>Topic</th><th>Reason</th><th>Actions</th></tr></thead>
        <tbody>
          {myTopics.map(t=>(
            <tr key={t.id}>
              <td>
                {editTopicId===t.id ? <input value={editTopicName} onChange={e=>setEditTopicName(e.target.value)} /> : t.topicName}
              </td>
              <td>
                {editTopicId===t.id ? <input value={editReason} onChange={e=>setEditReason(e.target.value)} /> : t.reason}
              </td>
              <td>
                {editTopicId===t.id ? (
                  <>
                    <button onClick={()=>saveTopic(t.id)}>Save</button>
                    <button onClick={()=>setEditTopicId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={()=>{ setEditTopicId(t.id); setEditTopicName(t.topicName); setEditReason(t.reason); }}>Edit</button>
                    <button onClick={()=>deleteTopic(t.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{marginTop:20}}>My Comments</h2>
      {myComments.length===0 && <p>No comments by you.</p>}
      <table>
        <thead><tr><th>Topic Id</th><th>Comment</th><th>Actions</th></tr></thead>
        <tbody>
          {myComments.map(c=>(
            <tr key={c.id}>
              <td>{c.topicId}</td>
              <td>{editCommentId===c.id ? <input value={editCommentText} onChange={e=>setEditCommentText(e.target.value)} /> : c.text}</td>
              <td>
                {editCommentId===c.id ? (
                  <>
                    <button onClick={()=>saveComment(c.id)}>Save</button>
                    <button onClick={()=>setEditCommentId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={()=>{ setEditCommentId(c.id); setEditCommentText(c.text); }}>Edit</button>
                    <button onClick={()=>deleteComment(c.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyContent;
