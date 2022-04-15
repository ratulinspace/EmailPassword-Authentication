import './App.css';
import { getAuth } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import app from "./firebase.init";
import { Button, Form } from 'react-bootstrap';

const auth = getAuth(app);

function App() {

  const handleEmailBlur = (e) => {
    console.log(e.target.value);
  }

  const handlePasswordBlur = (e) => {
    console.log(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='app'>
      <h3 className='text-center mt-2'>Email Password Authentication</h3>
      <div className="registration w-50 mx-auto mt-5">
        <h4 className=" text-primary">Register Now</h4>
        <Form className='mt-4'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
