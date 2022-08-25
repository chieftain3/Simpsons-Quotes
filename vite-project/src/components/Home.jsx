import React, { useEffect, useState } from "react";
import { Container} from 'react-bootstrap'
import CharacterList from "./cards";
import NavbarPage from "./Navbar";
import "./home.css"

const Home = () => {

    //En este componente estamos llamando a la api y es el Home, donde estan todas las cards

    const [characters, setCharacters] = useState([]);

    const initialurl = 'https://thesimpsonsquoteapi.glitch.me/quotes?count=20'
    const fetchcharacter = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => setCharacters(data))
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        fetchcharacter(initialurl);
    }, [])

    return (
        <>
            <NavbarPage />
            <Container>
                <Container>
                    <CharacterList characters={characters} />
                </Container>
            </Container>
        </>
    )
}

export default Home;

