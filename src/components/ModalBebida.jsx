import { Modal, Image } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

const ModalBebida = () => {
  const { modal, handleModalClick, receta } = useBebidas();

  const mostrarIngredientes = () => {
    let ingredientes = [];
    for (let i = 1; i <= 15; i++) {
      if (receta[`strIngredient${i}`]) {
        ingredientes.push(
          <li key={receta[`strIngredient${i}`]}>
            <b>{receta[`strIngredient${i}`]}</b>
            {receta[`strMeasure${i}`] && (
              <p className="mb-1">{receta[`strMeasure${i}`]}</p>
            )}
          </li>
        );
      }
    }
    return ingredientes;
  };
  return (
    <Modal show={modal} onHide={handleModalClick}>
      {receta.idDrink && (
        <>
          <Image
            src={receta.strDrinkThumb}
            alt={`Imagen de receta ${receta.strDrink}`}
          />

          <Modal.Header>
            <Modal.Title>{receta.strDrink}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-3">
              <h2>Intrucciones</h2>
              {receta?.strInstructionsES
                ? receta?.strInstructionsES
                : receta?.strInstructions
                ? receta?.strInstructions
                : receta?.strInstructionsDE
                ? receta?.strInstructionsDE
                : receta?.strInstructionsES
                ? receta?.strInstructionsES
                : receta?.strInstructionsFR
                ? receta?.strInstructionsFR
                : receta?.strInstructionsIT
                ? receta?.strInstructionsIT
                : "No hay intruciones en esta receta"}
              <h2>Ingredientes y Cantidades</h2>
              <ul>{mostrarIngredientes()}</ul>
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default ModalBebida;
