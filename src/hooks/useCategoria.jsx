import { useContext } from "react";
import CategoriaContext from "../context/CategoriasProvider";

const useCategoria = () => {
  return useContext(CategoriaContext);
};

export default useCategoria;
