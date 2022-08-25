import React, { useState } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row } from 'react-bootstrap';
import imag from '../assets/registerImg.jpg';
import titulo from '../assets/theSimpsonsLogo.png'
import './RegisterForm.css'

function Register() {

    //Componente de register, en este componente tomamos los datos del usuario y lo mandamos a nuestro back
    //para que se guarde en nuestra base de datos

    const [validated, setValidated] = useState(false);

    // esta constante se usa para saber si el formulario esta valido para mandar o no al back
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const [registerStatus, SetRegisterStatus] = useState([]);
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const navigate = useNavigate();

    //esta constante register pregunta si el usuario esta correctamente validado, si esta correcto
    //manda la informacion al back y el usuario queda registrado en la bbdd
    const register = () => {
        if (validated == true) {
            console.log('entre')
            Axios.post('http://localhost:3001/register',
                { username: usernameReg, email: emailReg, password: passwordReg }).then((response) => {
                    if (response.data.message) {
                        SetRegisterStatus(response.data.message)
                    }
                    else {
                        SetRegisterStatus('registration complete')
                        setTimeout(() => {
                            navigate('/')
                        }, 1000);
                    }
                });
        } else {
            SetRegisterStatus('Please complete the form')
        }
    }

    return (
        <Container className='mt-1 col-lg-10 col-md-8 col-sm-10' >
            <img src={titulo} className='col-12' style={{height: '150px'}}/>
            <Container className='mt-3 bg-secondary p-1 rounded bg-opacity-50'>
                <Row>
                    <img src={imag} className='w-50' />
                    <Container className='col-lg-5 col-md-6 col-sm-8'>
                        <Form className='mx-1' noValidate validated={validated} onChange={handleSubmit}>
                            <h2 className='m-3'> Registration </h2>
                            <Form.Group className='px-3' controlId="validationCustom01">
                                <Form.Label>User:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter User"
                                    name='username'
                                    onChange={(e) => {
                                        setUsernameReg(e.target.value);
                                    }} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='px-3 p-1' controlId="validationCustom02">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="Enter email"
                                    name='email'
                                    onChange={(e) => {
                                        setEmailReg(e.target.value);
                                    }} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='px-3 p-1' controlId="validationCustom03">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    name='password'
                                    onChange={(e) => {
                                        setPasswordReg(e.target.value);
                                    }} />
                            </Form.Group>
                            <Button className='p-1 mx-3' variant="primary" onClick={register}>
                                Submit
                            </Button>
                            <Link to={'/login'}> login </Link>
                        </Form>
                        <h3> {registerStatus} </h3>
                    </Container>
                </Row>
            </Container>
        </Container>
    );
}


export default Register;