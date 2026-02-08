import React, { useState } from 'react';
import Comment from './Comment';


const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [nextId, setNextId] = useState(1);

  const addNewComment = () => {
    if (newComment.trim() === '') return;
    
    const newCommentObj = {
      id: nextId,
      text: newComment.trim(),
      replies: []
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
    setNextId(nextId + 1);
  };

  const addReply = (parentId, replyText) => {
    if (replyText.trim() === '') return;

    const findAndAddReply = (commentList) => {
      return commentList.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: nextId,
                text: replyText.trim(),
                replies: []
              }
            ]
          };
        } else if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: findAndAddReply(comment.replies)
          };
        }
        return comment;
      });
    };
    setComments(findAndAddReply(comments));
    setNextId(nextId + 1);
  };

  return (
    <div className="comment-section">
      <h1>Comment Section</h1>
      
      <div className="new-comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type a comment..."
          data-testid="new-comment-input"
        />
        <button
          onClick={addNewComment}
          data-testid="add-comment-btn"
        >
          Add Comment
        </button>
      </div>

      {comments.length > 0 && <hr className="divider" />}

      <div className="comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={addReply}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
