import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CategoriaContext = createContext();

const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  const obtenerCategorias = async () => {
    try {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const {
        data: { drinks },
      } = await axios(url);
      setCategorias(drinks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
};

export { CategoriasProvider };
export default CategoriaContext;
