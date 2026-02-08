import React, { useState } from 'react';

const ReplyBox = ({ parentId, onSubmit, dataTestId }) => {
  const [replyText, setReplyText] = useState('');

  const handleSubmit = () => {
    if (replyText.trim() === '') return;
    onSubmit(replyText);
    setReplyText('');
  };

  return (
    <div className="reply-box">
      <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Type your reply..."
        data-testid={`reply-input-${parentId}`}
      />
      <button
        onClick={handleSubmit}
        data-testid={`submit-reply-${parentId}`}
      >
        Submit Reply
      </button>
    </div>
  );
};

export default ReplyBox;
