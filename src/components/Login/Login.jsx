import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState([]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(Validation(values));

    if (error.email === '' && error.password === '') {
      axios.post('http://localhost:8081/login', values)
        .then((res) => {
          if (res.data === 'Success') {
            navigate('/home');
          } else {
            alert('No record existed');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="card bg-white p-3 rounded w-25">
        <h2>Sign In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
              <input id="email" type="email" onChange={handleInput} name="email" placeholder="Enter Email" className="form-control rounded-0" />
              {error.email && <span className="text-danger">{error.email}</span>}
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
              <input id="password" type="password" onChange={handleInput} placeholder="Enter Password" name="password" className="form-control rounded-0" />
              {error.password && <span className="text-danger">{error.password}</span>}
            </label>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0"><strong>Log In</strong></button>
          <p>you agree to our terms and policies</p>
          <Link to="/registration" type="button" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Create Account</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
