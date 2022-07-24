import { createContext, useState, useEffect } from "react";
import axios from "axios";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [modal, setModal] = useState(false);
  const [receta, setReceta] = useState({});
  const [storageBebidas, setStorageBebias] = useState([]);

  useEffect(() => {
    const getBebidas =
      JSON.parse(localStorage.getItem("bebidas-favoritas")) || [];
    if (getBebidas.length > 0) {
      setStorageBebias(getBebidas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bebidas-favoritas", JSON.stringify(storageBebidas));
  }, [storageBebidas]);

  const consultarBebidas = async (datos) => {
    try {
      setSpinner(true);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
      const {
        data: { drinks },
      } = await axios(url);
      setBebidas(drinks);
    } catch (error) {
      console.error(error);
    } finally {
      setSpinner(false);
    }
  };
  const handleModalClick = () => {
    setModal(!modal);
  };

  const handleGuardarBebida = (bebida) => {
    const exite = storageBebidas.some((b) => b.idDrink == bebida.idDrink);
    if (exite) {
      setStorageBebias([...storageBebidas]);
    } else {
      setStorageBebias([...storageBebidas, bebida]);
    }
  };
  const handleEliminarBebida = (id) => {
    const confirmar = confirm("¿Desea eliminar?");
    if (confirmar) {
      const bebidasActualizadas = storageBebidas.filter((b) => b.idDrink != id);
      setStorageBebias(bebidasActualizadas);
    }
  };

  return (
    <BebidasContext.Provider
      value={{
        consultarBebidas,
        bebidas,
        modal,
        handleModalClick,
        receta,
        setReceta,
        handleGuardarBebida,
        storageBebidas,
        handleEliminarBebida,
        spinner
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};
export { BebidasProvider };
export default BebidasContext;
