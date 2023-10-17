import { setDoc, doc, serverTimestamp } from "firebase/firestore/lite";
import { db } from "../firebase/firebase";

export const handleAddWorkout = async (workout, userId) => {
  const slug = Math.random().toString(36).substring(2, 8);
  const date = serverTimestamp();

  try {
    setDoc(doc(db, "users", userId, "workouts", workout.name + slug), {
      name: workout.name,
      exercises: workout.exercises,
      date: date,
    });
    console.log(workout, userId, slug, date);
  } catch (error) {
    throw new Error("Error adding workout to database:" + error);
  }
};
