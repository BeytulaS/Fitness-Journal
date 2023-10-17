import Layout from "../../layout";
import { useState } from "react";
import { useExercises } from "../../providers/workoutsProvider";
import { handleAddWorkout } from "../../services/workoutServices";
import { useUser } from "../../providers/userProvider";

export default function WorkoutPage() {
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

  return (
    <Layout>
      <section className="h-full flex flex-col items-center justify-center">
        <button
          onClick={() => setIsWorkoutModalOpen(true)}
          className="p-1 rounded-md bg-blue-600 text-white"
        >
          Add a new workout
        </button>
      </section>
      <WorkoutModal
        isOpen={isWorkoutModalOpen}
        onClose={() => setIsWorkoutModalOpen(false)}
      />
    </Layout>
  );
}

function WorkoutModal({ isOpen, onClose }) {
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [workout, setWorkout] = useState({
    name: "Unnamed workout",
    exercises: [],
  });
  const { currentUser } = useUser();

  const handleClose = (e) => {
    if (e.target.classList.contains("overlay")) {
      setWorkout({ name: "Unnamed workout", exercises: [] });
      onClose();
    }
  };

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    if (isNaN(value)) return;

    setWorkout((prevWorkout) => {
      const updatedExercises = [...prevWorkout.exercises];
      const updatedSets = [...updatedExercises[exerciseIndex].sets];
      updatedSets[setIndex][field] = value;
      updatedExercises[exerciseIndex].sets = updatedSets;
      return {
        ...prevWorkout,
        exercises: updatedExercises,
      };
    });
  };

  const handleAddSet = (exerciseId) => {
    if (
      workout.exercises.find((exercise) => exercise.id === exerciseId).sets
        .length > 0
    ) {
      const lastSet = workout.exercises.find(
        (exercise) => exercise.id === exerciseId
      ).sets[
        workout.exercises.find((exercise) => exercise.id === exerciseId).sets
          .length - 1
      ];

      if (lastSet.reps === "" || lastSet.weight === "" || lastSet.rpe === "") {
        return;
      }
      setWorkout((prev) => {
        const updatedExercises = prev.exercises.map((exercise) =>
          exercise.id === exerciseId
            ? {
                ...exercise,
                sets: [
                  ...exercise.sets,
                  {
                    reps: lastSet.reps,
                    weight: lastSet.weight,
                    rpe: lastSet.rpe,
                  },
                ],
              }
            : exercise
        );
        return { ...prev, exercises: updatedExercises };
      });
    } else {
      setWorkout((prev) => {
        const updatedExercises = prev.exercises.map((exercise) =>
          exercise.id === exerciseId
            ? {
                ...exercise,
                sets: [...exercise.sets, { reps: "", weight: "", rpe: "" }],
              }
            : exercise
        );
        return { ...prev, exercises: updatedExercises };
      });
    }
  };

  const handleRemoveSet = (exerciseId) => {
    setWorkout((prev) => {
      const updatedExercises = prev.exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.slice(0, -1),
            }
          : exercise
      );
      return { ...prev, exercises: updatedExercises };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAddWorkout(workout, currentUser.uid)
      .then(() => setWorkout({ name: "Unnamed workout", exercises: [] }))
      .then(() => onClose());
  };

  return (
    <>
      {isOpen && (
        <div
          className="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="modal relative bg-white p-4 rounded-md w-[90%] md:w-[60%] h-[70vh] md:max-w-lg overflow-hidden">
            <form
              onSubmit={handleSubmit}
              className="workout-form p-2 w-full h-full flex flex-col items-center justify-between"
            >
              <div className="inline-flex items-center justify-center w-full mb-2">
                <input
                  type="text"
                  value={workout.name}
                  onChange={(e) =>
                    setWorkout({ ...workout, name: e.target.value })
                  }
                  className="text-2xl font-bold px-0 text-center rounded-md"
                />
              </div>

              <div className="exercises-container mb-2 overflow-y-scroll flex-1">
                {workout.exercises.length > 0 &&
                  workout.exercises.map((exercise, exerciseIndex) => (
                    <div
                      className="exercise-continer flex items-center flex-col gap-2 text-left overflow-y-scroll"
                      key={exerciseIndex}
                    >
                      <h2 className="text-xl font-semibold mb-2">
                        {exercise.name}
                      </h2>
                      <table className="w-full ">
                        <thead>
                          <tr className="w-full flex justify-between ">
                            <th className="w-1/12 font-semibold">Set</th>
                            <th className="w-2/12 font-semibold">Reps</th>
                            <th className="w-2/12 font-semibold">Weight</th>
                            <th className="w-2/12 font-semibold">RPE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exercise.sets.map((set, setIndex) => (
                            <ExerciseSetRow
                              key={setIndex}
                              setIndex={setIndex}
                              set={set}
                              exerciseIndex={exerciseIndex}
                              handleSetChange={handleSetChange}
                            />
                          ))}
                        </tbody>
                      </table>
                      <div className="buttons w-full px-4  flex justify-between gap-2 mb-4">
                        <button
                          type="button"
                          className="bg-red-500 text-white font-semibold w-full rounded-md"
                          onClick={() => handleRemoveSet(exercise.id)}
                        >
                          Remove set
                        </button>
                        <button
                          type="button"
                          className="bg-blue-600 text-white font-semibold w-full rounded-md"
                          onClick={() => handleAddSet(exercise.id)}
                        >
                          Add set
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="w-full">
                <button
                  type="button"
                  className="bg-blue-600 text-white w-full font-semibold rounded-md mb-2"
                  onClick={() => setIsAddExerciseOpen(true)}
                >
                  Add exercise
                </button>
                <div className="w-full flex gap-2">
                  <button
                    type="button"
                    className="bg-red-500 text-white w-full font-semibold rounded-md"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white w-full font-semibold rounded-md"
                  >
                    Save workout
                  </button>
                </div>
              </div>
            </form>
            <AddExercise
              isOpen={isAddExerciseOpen}
              onClose={() => setIsAddExerciseOpen(false)}
              addExercise={setWorkout}
              workout={workout}
            />
          </div>
        </div>
      )}
    </>
  );
}

function AddExercise({ isOpen, onClose, addExercise, workout }) {
  const { exercises } = useExercises();
  const [searchResults, setSearchResults] = useState(exercises.slice(0, 10));

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const results = exercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(searchTerm) ||
        exercise.category.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  };

  const handleAddExercise = (exercise) => {
    if (workout.exercises.find((ex) => ex.id === exercise.id)) {
      return;
    }
    addExercise((prevWorkout) => ({
      ...prevWorkout,
      exercises: [
        ...prevWorkout.exercises,
        {
          name: exercise.name,
          id: exercise.id,
          sets: [
            {
              reps: "",
              weight: "",
              rpe: "",
            },
          ],
        },
      ],
    }));
    onClose();
  };

  return (
    <div
      className={`exercise-selector absolute bottom-0 left-0 right-0 overflow-hidden transition-all duration-300 ${
        isOpen ? "h-[90%]" : "h-0"
      } bg-slate-100 flex flex-col items-center rounded-md border-t border-slate-200 shadow-md`}
    >
      <label htmlFor="exercise" className="text-xl font-bold mb-4">
        Exercise
      </label>
      <input
        type="text"
        placeholder="Search Exercise"
        className="p-1 w-3/4 rounded-md border border-slate-200 shadow-sm"
        onChange={handleSearch}
      />
      <div className="search-results max-h-full overflow-y-scroll w-3/4 my-8 text-center flex flex-col gap-2">
        {searchResults.map((exercise) => (
          <div
            key={exercise.id}
            className="exercise border border-slate-200 bg-white rounded-md shadow-sm py-1 w-[90%] mx-auto cursor-pointer"
            onClick={() => handleAddExercise(exercise)}
          >
            <h3 className="">
              {exercise.name} {exercise.equipment && `(${exercise.equipment})`}
            </h3>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="bg-red-500 text-white font-semibold rounded-md mb-4 px-8 "
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}

function ExerciseSetRow({ setIndex, set, exerciseIndex, handleSetChange }) {
  return (
    <tr className="w-full flex justify-between">
      <td className="w-1/12">{setIndex + 1}</td>
      <td className="w-2/12">
        <input
          type="text"
          value={set.reps}
          onChange={(e) =>
            handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)
          }
          className="w-full rounded-md"
        />
      </td>
      <td className="w-2/12">
        <input
          type="text"
          value={set.weight}
          onChange={(e) =>
            handleSetChange(exerciseIndex, setIndex, "weight", e.target.value)
          }
          className="w-full rounded-md"
        />
      </td>
      <td className="w-2/12">
        <input
          type="text"
          value={set.rpe}
          onChange={(e) =>
            handleSetChange(exerciseIndex, setIndex, "rpe", e.target.value)
          }
          className="w-full rounded-md"
        />
      </td>
    </tr>
  );
}
