import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import WorkoutPage from "./pages/workouts/WorkoutPage";
import ProfilePage from "./pages/profile/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/workouts",
    element: <WorkoutPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

export default router;
