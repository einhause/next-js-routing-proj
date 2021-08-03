import axios from 'axios';
import { useRef, useState, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const [userEmail, setUserEmail] = useState(null);
  const emailRef = useRef();
  const notificationCxt = useContext(NotificationContext);

  function registrationHandler(e) {
    e.preventDefault();

    const currentEmailInput = emailRef.current.value;

    notificationCxt.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter...',
      status: 'pending',
    });

    const reqBody = { email: currentEmailInput };

    const reqHeaders = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .post('/api/newsletter', reqBody, reqHeaders)
      .then((res) => {
        if (res.ok) return setUserEmail(res.data.email);
      })
      .then(() => {
        notificationCxt.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter...',
          status: 'success',
        });
      })
      .catch((err) => {
        notificationCxt.showNotification({
          title: 'Failed',
          message:
            err.message ||
            'Unable to register for newsletter, try again later.',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
