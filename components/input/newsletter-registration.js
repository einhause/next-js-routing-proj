import axios from 'axios';
import { useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const [userEmail, setUserEmail] = useState(null);
  const emailRef = useRef();
  function registrationHandler(e) {
    e.preventDefault();

    const currentEmailInput = emailRef.current.value;

    const reqBody = { email: currentEmailInput };

    const reqHeaders = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .post('/api/newsletter', reqBody, reqHeaders)
      .then((res) => setUserEmail(res.data.email))
      .catch((err) => console.error(err));
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
