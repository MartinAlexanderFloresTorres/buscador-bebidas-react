import { useContext } from "react";
import BebidasContext from "../context/BebidasProvider";

const useBebidas = () => {
  return useContext(BebidasContext);
};

export default useBebidas;
