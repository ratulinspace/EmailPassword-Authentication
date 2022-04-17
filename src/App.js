import './App.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import app from "./firebase.init";
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleNameBlur = (event) => {
    setName(event.target.value);
  }
  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  }
  const handleRegisteredChange = (e) => {
    setRegistered(e.target.checked);
  }
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email sent')
      })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault(); //For stopping auto reload the page
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    // VALIDATION
    if (!/(?=.*?[0-9])/.test(password)) {
      setError('Password should contain at least one special character');
      return;
    }

    setValidated(true);
    setError('');

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          verifyEmail();
          setUserName();
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }
    const setUserName = () => {
      updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
        console.log('Updating name');
      })
        .catch(error => {
          setError(error.message);
        })
    }
    const verifyEmail = () => {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('Email verification send');
        })
    }

    e.preventDefault();

  }

  return (
    <div className='app'>
      <h3 className='text-center mt-2'>Email Password Authentication</h3>
      <div className="registration border p-3 w-50 mx-auto mt-5">
        <h3 className="text-primary">{registered ? "Login" : "Register"} Now</h3>

        <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='mt-4'>
          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter your name" required />
            <Form.Control.Feedback type="invalid">
              Please provide a your name.
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted fw-light">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
          </Form.Group>
          <Button onClick={handlePasswordReset} variant="link">Forget Password?</Button>
          <br />
          <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>

        </Form>

      </div>
    </div>
  );
}

export default App;
