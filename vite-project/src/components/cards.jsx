import { React, useState } from "react";
import { Container, Row, Collapse } from "react-bootstrap";
import './cards.css'

const CharacterList = ({ characters }) => {

  const [open, setOpen] = useState(false);

  //Aca estan las cards que traemos desde la API externa con un map y pasamos la informacion
  //dentro de esos items estan la informacion que requerimos, tal como la imagen del personaje o el quote
  return (
    <Container>
      <Row>
        {characters.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4 mt-4">
            <div className="card container1" style={{ minWidth: "200px" }}>
              <div role='button' onClick={() => setOpen(!open)}
                aria-controls="collapse-text"
                aria-expanded={open}>
                <img className="card-img-top w-100" style={{ height: "300px" }} src={item.image} alt="character" />
                <div className="card-body">
                  <h6 className="card-title">{item.character}</h6>
                </div>
              </div>
              <Collapse in={open}>
                <div id='collapse-text'>
                  <hr/>
                  {item.quote}
                </div>
              </Collapse>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default CharacterList;