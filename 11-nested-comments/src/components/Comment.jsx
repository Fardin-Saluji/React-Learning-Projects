import React, { useState } from 'react';
import ReplyBox from './ReplyBox';

const Comment = ({ comment, onReply, depth = 0 }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReply = (replyText) => {
    onReply(comment.id, replyText);
    setShowReplyBox(false);
  };

  return (
    <div 
      className="comment"
      data-testid={`comment-${comment.id}`}
      style={{ marginLeft: depth > 0 ? '30px' : '0' }}
    >
      <div className="comment-content">
        <p className="comment-text">{comment.text}</p>
      </div>
      
      <button
        className="reply-btn"
        onClick={() => setShowReplyBox(!showReplyBox)}
        data-testid={`reply-btn-${comment.id}`}
      >
        Add a reply
      </button>

      {showReplyBox && (
        <ReplyBox
          parentId={comment.id}
          onSubmit={handleReply}
          dataTestId={`reply-input-${comment.id}`}
        />
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
