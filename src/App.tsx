import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
// lazy load each container
import Login from './pages/Login';
const Register = lazy(() => import('./pages/Register'));
const Orders = lazy(() => import('./pages/Orders'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
import { UserContext } from './hooks/userContext';
import { removeToken } from './utils/auth';

export default function App() {
  const location = useLocation();
  const [user, setUser] = useState<{ username: string; email: string; roles: string[]; }>({ username: '', email: '', roles: [] });

  // on load, decript token and set user
  useEffect(() => {
    const token = localStorage.getItem('x-access-token');

    if (!token) {
      if (location.pathname !== "/sign-in") {
        alert("You must be logged in to view this page.");
        removeToken();
        window.location.href = "/sign-in";
      }
      return;
    }

    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));

    if (decodedPayload.exp < Date.now() / 1000) {
      alert("expired token, please log in again.");
      removeToken();
      window.location.href = "/sign-in";
      return;
    }
  
    setUser({
      username: decodedPayload.username,
      email: decodedPayload.email,
      roles: decodedPayload.roles
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Suspense fallback={<>Loading...</>}>
        <Routes key={location.pathname} location={location}>

          <Route path="/sign-in" element={<Login />} />

          <Route path="/sign-up" element={<Register />} />
          
          <Route path="/profile" element={<Profile />} />

          {/* {user?.roles?.includes("ROLE_MODERATOR") && 
          } */}
          <Route path="/users" element={<Orders />} />

          {/* {user?.roles?.includes("ROLE_ADMIN") && 
          } */}
          <Route path="/management" element={<Settings />} />

          <Route path={`*`} element={<Navigate to="/sign-in" replace />} />
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}
