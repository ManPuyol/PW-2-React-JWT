import { lazy, Suspense, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
// lazy load each container
// const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Forgot = lazy(() => import('./pages/Forgot'));
// const Dashboard = lazy(() => import('./pages/Dashboard'));
const Orders = lazy(() => import('./pages/Orders'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
// const Uploads = lazy(() => import('./pages/Uploads'));
// const Gallery = lazy(() => import('./pages/Gallery'));
// const Messages = lazy(() => import('./pages/Messages'));
// const Email = lazy(() => import('./pages/Email'));
// const Team = lazy(() => import('./pages/Team'));
// const Rentals = lazy(() => import('./pages/Rentals'));
import { UserContext } from './hooks/userContext';

export default function App() {
  const location = useLocation();
  const [user, setUser] = useState<{ username: string; email: string; roles: string[]; } | {}>({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Suspense fallback={<>Loading...</>}>
        <Routes key={location.pathname} location={location}>
          {/* <Route path="/" element={<Home />} /> */}

          <Route path="/sign-in" element={<Login />} />

          <Route path="/sign-up" element={<Register />} />

          <Route path="/forgot-password" element={<Forgot />} />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          <Route path="/users" element={<Orders />} />

          {/* <Route path="/dashboard/gallery" element={<Gallery />} /> */}

          <Route path="/management" element={<Settings />} />

          <Route path="/profile" element={<Profile />} />

          {/* <Route path="/dashboard/uploads" element={<Uploads />} /> */}

          {/* <Route path="/dashboard/messages" element={<Messages />} /> */}

          {/* <Route path="/dashboard/email" element={<Email />} /> */}

          {/* <Route path="/dashboard/team" element={<Team />} /> */}

          {/* <Route path="/dashboard/rentals" element={<Rentals />} /> */}

          <Route path={`*`} element={<Navigate to="/sign-in" replace />} />
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}
