import React, { useEffect, useState } from "react";
import { Col, Card, Button, Row } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
import axios from "axios";
import heart from "../assets/heart.svg";
import ver from "../assets/ver.svg";

const Bebida = ({ bebida }) => {
  const { handleModalClick, setReceta, handleGuardarBebida } = useBebidas();
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [load, setLoad] = useState(false);

  const { strDrink, strDrinkThumb, idDrink } = bebida;

  useEffect(() => {
    if (cargando) {
      const peticion = async () => {
        try {
          const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
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

  const guardar = () => {
    setGuardando(true);
    setTimeout(() => {
      handleGuardarBebida(bebida);
      setGuardando(false);
    }, 1000);
  };

  const handleClick = () => setCargando(true);

  return (
    <Col md={6} lg={4} xl={3} className={`${!load ? "d-none" : "d-block" }`}>
      <Card className="mb-4">
        <Card.Img
          onLoad={() => setLoad(true)}
          variant="top"
          src={strDrinkThumb}
          alt={`imagen de ${strDrink}`}
        />
        <Card.Body className="h-auto">
          <Card.Title>{strDrink}</Card.Title>

          <Row>
            <Col>
              <Button
                title="Ver"
                className="w-100 text-upercase mt-2 fw-semibold"
                variant="none"
                disabled={cargando}
                onClick={!cargando ? handleClick : null}
              >
                {cargando ? "Cargando..." : <img src={ver} alt="ver" />}
              </Button>
            </Col>

            <Col>
              <Button
                title="Agregar"
                onClick={guardar}
                disabled={guardando}
                className="w-100 text-upercase mt-2 fw-semibold"
                variant="none"
              >
                {!guardando ? (
                  <img src={heart} alt="guardar" />
                ) : (
                  "Guardado"
                )}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Bebida;
