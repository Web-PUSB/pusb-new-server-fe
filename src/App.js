import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import './index.css';
import routes from "./routes";
import { useSession } from "./context/sessionContext";

const Signin = React.lazy(() => import("./app/(authentication)/auth/signin/page"));
const Home = React.lazy(() => import("./app/(main)/admin/pusb/page"));
const Structure = React.lazy(() => import("./app/(main)/admin/pusb-structure/page"));
const Events = React.lazy(() => import("./app/(main)/admin/pusb-events/page"));
const Profile = React.lazy(() => import("./app/(main)/admin/pusb-profile/page"));
const CnC = React.lazy(() => import("./app/(main)/admin/pusb-cnc/page"));
const News = React.lazy(() => import("./app/(main)/admin/pusb-news/page"));
const User = React.lazy(() => import("./app/(main)/admin/pusb-user/page"));

const componentMap = {
  "pusb": Home,
  "pusb-events": Events,
  "pusb-profile": Profile,
  "pusb-cnc": CnC,
  "pusb-news": News,
  "pusb-structure": Structure,
  "pusb-user": User,
};

function App() {
  const { isAuthenticated } = useSession();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Redirect to Signin if not logged in */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/auth/signin" />
          }
        />

        <Route path="/auth/signin" element={<Signin />} />

        {/* Dynamic Routing */}
        {routes.map((route) => {
          const Component = componentMap[route.path];
          return Component ? (
            <Route
              key={route.path}
              path={`/${route.path}`}
              element={
                isAuthenticated ? <Component /> : <Navigate to="/auth/signin" />
              }
            />
          ) : null;
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
