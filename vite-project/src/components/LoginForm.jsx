import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Container, Button, Form, Row } from 'react-bootstrap';
import imag from '../assets/OIP.jpg';
import titulo from '../assets/theSimpsonsLogo.png'

function LoginForm() {

  //Este es el componente de login, usamos Axios para pasar los resultados de los inputs del front al back

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const navigate = useNavigate()

  const login = () => {
    Axios.post('http://localhost:3001/login',
      { email: email, password: password, }).then((response) => {
        //El response nos pasa el dato de que si el usuario esta registrado o no
        if (response.data.message) {
          setLoginStatus(response.data.message)
        } else {
          setLoginStatus('Login Confirmed');
          setTimeout(() => {
            navigate('/')
          }, 1000);
        }
      });
  }

  //Este useEffect lo que hace es preguntar al back si el usuario esta logeado y si esta logeado lo manda al home
  //aunque refresquemos la pagina y demas nos manda hasta que no le demos logout
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        navigate('/')
      }
    });
  }, []);

  const [password, setPasswordLog] = useState("");
  const [email, setEmailLog] = useState("");

  return (

    <Container className='mt-1 col-lg-10 col-md-8 col-sm-10' >
      <img src={titulo} className='col-12' style={{ height: '150px' }} />
      <Container className=' mt-3 bg-secondary p-1 rounded bg-opacity-50 position-absolute top-50 start-50 translate-middle'>
        <Row>
          <img src={imag} className='w-50' />
          <Container className='container col-lg-5 col-md-6 col-sm-12'>
            <Form >
              <h2 className='p-3'> Login </h2>
              <Form.Group className='px-3 p-1' controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
                  setEmailLog(e.target.value);
                }} />
              </Form.Group>
              <Form.Group className='px-3 p-3' controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => {
                  setPasswordLog(e.target.value);
                }} />
              </Form.Group>
              <Form.Group>
                <Button className='p-1 mx-3' variant="primary" onClick={login}>
                  Submit
                </Button>
                <Link to='/register'> Register </Link>
              </Form.Group>
            </Form>
            <h3> {loginStatus} </h3>
          </Container>
        </Row>
      </Container>
    </Container>
  );
}

export default LoginForm;
