import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const notificationCxt = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [fetchedComments, setFetchedComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      axios
        .get(`/api/comments/${eventId}`)
        .then((res) => setFetchedComments(res.data.comments))
        .then(setIsFetchingComments(false))
        .catch((err) => {
          notificationCxt.showNotification({
            title: 'Failed',
            message: err.message || 'Unable to load comment, try again later.',
            status: 'error',
          });
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCxt.showNotification({
      title: 'Posting comment...',
      message: 'Posting your comment...',
      status: 'pending',
    });

    const reqHeaders = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .post(`/api/comments/${eventId}`, commentData, reqHeaders)
      .then((res) => {
        if (res.ok) return res.data;
      })
      .then(() => {
        notificationCxt.showNotification({
          title: 'Success!',
          message: 'Successfully posted your comment.',
          status: 'success',
        });
      })
      .catch((err) => {
        notificationCxt.showNotification({
          title: 'Failed',
          message: err.message || 'Unable to post comment, try again later.',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList items={fetchedComments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
