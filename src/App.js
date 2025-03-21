import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./Home";
import './index.css';
import routes from "./routes";

const Structure = React.lazy(() => import("./app/(main)/admin/pusb-structure/page"));
const Events = React.lazy(() => import("./app/(main)/admin/pusb-events/page"));
const Profile = React.lazy(() => import("./app/(main)/admin/pusb-profile/page"))
const CnC = React.lazy(() => import("./app/(main)/admin/pusb-cnc/page"));
const News = React.lazy(() => import("./app/(main)/admin/pusb-news/page"));
const User = React.lazy(() => import("./app/(main)/admin/pusb-user/page"))
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
  return (
    <BrowserRouter>
      <Main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Splash Screen → Home */}
            <Route path="/" element={<Home />} />

            {/* Dynamic Routing */}
            {routes.map((route) => {
              const Component = componentMap[route.path];
              return Component ? (
                <Route
                  key={route.path}
                  path={`/${route.path}`}
                  element={<Component />}
                />
              ) : null;
            })}
          </Routes>
        </Suspense>
      </Main>
    </BrowserRouter>
  );
}

export default App;
