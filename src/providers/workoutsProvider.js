import { useContext, createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "../shared/LoadingPage";

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

      const englishExercises = results.filter((result) => {
        return result.exercises[0].language === 2;
      });

      console.log(englishExercises);

      const filteredExercises = englishExercises.map((exercise) => {
        return {
          id: exercise.id,
          uuid: exercise.uuid,
          created: exercise.created,
          last_update: exercise.last_update,
          category: exercise.category.name,
          muscles: exercise.muscles,
          muscles_secondaty: exercise.muscles_secondary,
          equipment: exercise.equipment[0]?.name,
          images: exercise.images,
          videos: exercise.videos,
          name: exercise.exercises[0].name,
          description: exercise.exercises[0].description,
        };
      });

      setExercises(filteredExercises);

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
      {loading ? <LoadingPage /> : children}
    </ExercisesContext.Provider>
  );
}
