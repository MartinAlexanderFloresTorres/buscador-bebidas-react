import { useEffect, useState } from "react";
import useBebidas from "../hooks/useBebidas";
import { Col, Row, Button, Offcanvas } from "react-bootstrap";
import axios from "axios";
import ver from "../assets/ver_white.svg";
import tacho from "../assets/delete.svg";

function Favoritos() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [id, setId] = useState(0);

  const { handleModalClick, setReceta, storageBebidas, handleEliminarBebida } =
    useBebidas();
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (cargando) {
      const peticion = async () => {
        try {
          const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
          const {
            data: { drinks },
          } = await axios(url);
          setReceta(drinks[0]);
          handleModalClick();
        } catch (error) {
          console.error(error);
        } finally {
          setCargando(false);
        }
      };
      peticion();
    }
  }, [cargando]);

  const handleClick = (id) => {
    setId(id);
    setCargando(true);
  };

  return (
    <>
      <Button
        type="button"
        variant="danger"
        className="text-uppercase w-100"
        onClick={handleShow}
      >
        Favoritos
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">Mis Bebidas Favoritas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {storageBebidas.length > 0 ? (
              storageBebidas.map((item) => (
                <li key={item.idDrink} className="mb-3">
                  <Row className="contenido-favoritos">
                    <Col>{item.strDrink}</Col>
                    <Col>
                      <Row>
                        <Col>
                          <Button
                            className="w-100 mb-1 text-upercase"
                            variant="primary"
                            disabled={cargando && item.idDrink == id}
                            onClick={
                              !cargando ? () => handleClick(item.idDrink) : null
                            }
                          >
                            {cargando && item.idDrink == id ? (
                              ". . ."
                            ) : (
                              <img src={ver} alt="ver" />
                            )}
                          </Button>
                        </Col>

                        <Col>
                          <Button
                            className="w-100 text-upercase"
                            variant="danger"
                            onClick={() => handleEliminarBebida(item.idDrink)}
                          >
                            <img src={tacho} alt="delete" />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </li>
              ))
            ) : (
              <p>Comienze Agregando sus bebidas.</p>
            )}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Favoritos;
