import React from 'react'
import { Nav} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/losSimpsonsLogo.png';
import axios from 'axios';

function NavbarPage() {

    const navigate = useNavigate()
    const logout = () => {
        alert('Are you sure?')
        
        axios.delete('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn == false) {
                navigate('/login')
            }
        })
    }

    return (
            <Nav className="navbar d-flex justify-content-around">
                <img src={logo} alt="logo-TheSimpsons" width="60" height="60" className="d-inline-block align-text-top" />
                <div className='d-flex'>
                    <h2 id='font-personality'> The Simpsons Quotes </h2>
                </div>
                <Link className='button-primary' to={'/login'} onClick={logout}> logout </Link>
            </Nav>
    )
}

export default NavbarPage