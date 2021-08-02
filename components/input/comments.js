import { useState, useEffect } from 'react';
import axios from 'axios';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [fetchedComments, setFetchedComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      axios
        .get(`/api/comments/${eventId}`)
        .then((res) => setFetchedComments(res.data.comments));
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const reqHeaders = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .post(`/api/comments/${eventId}`, commentData, reqHeaders)
      .then((res) => res.data);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={fetchedComments} />}
    </section>
  );
}

export default Comments;
