import { useContext, createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ExercisesContext = createContext();

export function useExercises() {
  return useContext(ExercisesContext);
}

export function ExercisesProvider({ children }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getExercises() {
    try {
      const res = await axios.get(
        "https://wger.de/api/v2/exercisebaseinfo/?limit=395"
      );
      const results = res.data.results;

      const filteredResults = results.filter((result) => {
        return result.exercises[0].language === 2;
      });

      setExercises(filteredResults);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getExercises();
  }, []);

  const value = {
    exercises,
    getExercises,
  };

  return (
    <ExercisesContext.Provider value={value}>
      {!loading && children}
    </ExercisesContext.Provider>
  );
}
