import { useState } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
import useCategoria from "../hooks/useCategoria";
import Favoritos from "./Favoritos";

const Formulario = () => {
  const { categorias } = useCategoria();
  const { consultarBebidas } = useBebidas();
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });
  const [alerta, setAlerta] = useState("");

  const handleChange = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(busqueda).includes("")) {
      setAlerta("Todo los campos son obligatorios");
      return;
    }
    setAlerta("");
    consultarBebidas(busqueda);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {alerta && (
        <Alert variant="danger" className="text-center p-2">
          {alerta}
        </Alert>
      )}
      <Row className="align-items-center">
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre Bebida</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Tequila, Vodka, etc"
              name="nombre"
              id="nombre"
              value={busqueda.nombre}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="categoria">Categoría Bebida</Form.Label>
            <Form.Select
              id="categoria"
              name="categoria"
              value={busqueda.categoria}
              onChange={handleChange}
            >
              <option value="">Seleciona Categoria</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria?.strCategory}
                  value={categoria?.strCategory}
                >
                  {categoria?.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4} className="mt-3">
          <Row>
            <Col md={6}>
              <Button
                type="submit"
                variant="danger"
                className="text-uppercase w-100 mb-3 mb-md-0"
              >
                Buscar
              </Button>
            </Col>
            <Col md={6}>
              <Favoritos />
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;
