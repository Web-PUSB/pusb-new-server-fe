import { Route, Routes, Navigate } from "react-router-dom"; 
import React, { Suspense } from "react";
import './index.css';
import routes from "./routes";
import { useSession } from "./context/sessionContext";
import AdminLayout from "././app/(main)/admin/layout";

const Signin = React.lazy(() => import("./app/(authentication)/auth/signin/page"));
const Load = React.lazy(() => import("./app/page"));
const Home = React.lazy(() => import("./app/(main)/admin/pusb/page"));
const Structure = React.lazy(() => import("./app/(main)/admin/pusb-structure/page"));
const StructureCreateMember = React.lazy(() => import("./app/(main)/admin/pusb-structure/create/member/page"));
const StructureCreateMinister = React.lazy(() => import("./app/(main)/admin/pusb-structure/create/minister/page"));
const Events = React.lazy(() => import("./app/(main)/admin/pusb-events/page"));
const EventsCreate = React.lazy(() => import("./app/(main)/admin/pusb-events/create/page"));
const EventsEdit = React.lazy(() => import("./app/(main)/admin/pusb-events/[id]/edit/page"));
const EventsDetails = React.lazy(() => import("./app/(main)/admin/pusb-events/[id]/details/page"));
const EventsCreateTimeline = React.lazy(() => import("./app/(main)/admin/pusb-events/[id]/details/create-timeline/page"));
const EventsEditTimeline = React.lazy(() => import("./app/(main)/admin/pusb-cnc/[id]/details/[workplanCncId]/edit/page"));
const Profile = React.lazy(() => import("./app/(main)/admin/pusb-profile/page"));
const ProfileCreate = React.lazy(() => import("./app/(main)/admin/pusb-profile/profile/create/page"));
const ProfileWorkplanEdit = React.lazy(() => import("./app/(main)/admin/pusb-profile/workplan/[id]/edit/page"));
const ProfileWorkplanPost = React.lazy(() => import("./app/(main)/admin/pusb-profile/workplan/[id]/post/page"));
const CnC = React.lazy(() => import("./app/(main)/admin/pusb-cnc/page"));
const CnCCreate = React.lazy(() => import("./app/(main)/admin/pusb-cnc/create/page"));
const CnCEdit = React.lazy(() => import("./app/(main)/admin/pusb-cnc/[id]/edit/page"));
const CnCDetails = React.lazy(() => import("./app/(main)/admin/pusb-cnc/[id]/details/page"));
const CnCWorkplanEdit = React.lazy(() => import("./app/(main)/admin/pusb-cnc/[id]/details/[workplanCncId]/edit/page"));
const News = React.lazy(() => import("./app/(main)/admin/pusb-news/page"));
const NewsCreate = React.lazy(() => import("./app/(main)/admin/pusb-news/create/page"));
const NewsEdit = React.lazy(() => import("./app/(main)/admin/pusb-news/[id]/edit/page"));
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

  console.log("isAuthenticated:", isAuthenticated);
  console.log("Routes:", routes);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/admin/pusb" /> : <Navigate to="/auth/signin" />
          }
        />

        <Route path="/auth/signin" element={<Signin />} />

        {/* Wrap all admin routes with layout */}
        <Route
          path="/admin/*"
          element={
            isAuthenticated ? <AdminLayout /> : <Navigate to="/auth/signin" />
          }
        >
          {/* Map basic routes */}
          {routes.map((route) => {
            const Component = componentMap[route.path];
            return Component ? (
              <Route key={route.path} path={route.path} element={<Component />} />
            ) : null;
          })}

          {/* CNC routes */}
          <Route path="pusb-cnc/create" element={<CnCCreate />} />
          <Route path="pusb-cnc/:id/edit" element={<CnCEdit />} />
          <Route path="pusb-cnc/:id/details" element={<CnCDetails />} />
          <Route path="pusb-cnc/:id/details/:workplanCncId/edit" element={<CnCWorkplanEdit />} />

          {/* News routes */}
          <Route path="pusb-news/create" element={<NewsCreate />} />
          <Route path="pusb-news/:id/edit" element={<NewsEdit />} />

          {/* Structure routes */}
          <Route path="pusb-structure/create/member" element={<StructureCreateMember />} />
          <Route path="pusb-structure/create/minister" element={<StructureCreateMinister />} />

          {/* Events routes */}
          <Route path="pusb-events/create" element={<EventsCreate />} />
          <Route path="pusb-events/:id/edit" element={<EventsEdit />} />
          <Route path="pusb-events/:id/details" element={<EventsDetails />} />
          <Route path="pusb-events/:id/details/create-timeline" element={<EventsCreateTimeline />} />

          {/* Profile routes */}
          <Route path="pusb-profile/profile/create" element={<ProfileCreate />} />
          <Route path="pusb-profile/workplan/:id/edit" element={<ProfileWorkplanEdit />} />
          <Route path="pusb-profile/workplan/:id/post" element={<ProfileWorkplanPost />} />
        </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Suspense>

  );
}

export default App;
