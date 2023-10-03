import Layout from "../../layout";
import { useState } from "react";
import { useExercises } from "../../providers/workoutsProvider";

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
  const { exercises } = useExercises();

  const handleClose = (e) => {
    if (e.target.classList.contains("overlay")) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="relative bg-white p-4 rounded-md min-w-[90%] md:min-w-[60%] min-h-[70vh]">
            <h1 className="text-2xl font-bold mb-4 ml-4">Add a new workout</h1>
            <form action="" className="w-full p-4 flex flex-col items-center">
              <button type="button" className="bg-slate-200 w-full rounded-md">
                Add exercise
              </button>
            </form>
            <AddExercise />
          </div>
        </div>
      )}
    </>
  );
}

function AddExercise() {
  const { exercises } = useExercises();
  const [searchResults, setSearchResults] = useState(exercises.slice(0, 10));

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const results = exercises.filter((exercise) =>
      exercise.exercises[0].name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  };

  return (
    <div className="absolute top-16 left-0 w-full h-full bg-slate-100 flex flex-col items-center rounded-md border-t border-slate-200 shadow-md">
      <label htmlFor="exercise" className="text-xl font-bold mb-4">
        Exercise
      </label>
      <input
        type="text"
        placeholder="Search Exercise"
        className="p-1 w-3/4 rounded-md border border-slate-200 shadow-sm"
        onChange={handleSearch}
      />
      <div className="search-results max-h-full overflow-y-scroll w-3/4 py-8">
        {searchResults.map((exercise) => (
          <div key={exercise.id} className="exercise">
            <h3 className="text-lg font-bold">{exercise.exercises[0].name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
