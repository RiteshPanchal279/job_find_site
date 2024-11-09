import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProctedRoute from "./components/admin/ProctedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  //  for admin routs
  {
    path: "/admin/companies",
    element: (
      <ProctedRoute>
        <Companies />
      </ProctedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProctedRoute>
        <CompanyCreate />
      </ProctedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProctedRoute>
        <CompanySetup />
      </ProctedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProctedRoute>
        <AdminJobs />
      </ProctedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProctedRoute>
        <PostJob />
      </ProctedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProctedRoute>
        <Applicants />
      </ProctedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
