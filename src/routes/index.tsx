import { useRoutes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
  ]);
};

export default AppRoutes;
