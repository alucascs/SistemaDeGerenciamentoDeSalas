import { useState } from "react";
import { useEffect } from "react";
import { buscarAulas } from "../../../services/aula/AulaService";

export function useAulas() {
  const [Aulas, setAulas] = useState([]);
  const fetchAulas = async () => {

    const data = await buscarAulas();
    setAulas(data);
  };

  useEffect(() => {
    fetchAulas();
  }, []);

  return { Aulas, setAulas, fetchAulas };
}