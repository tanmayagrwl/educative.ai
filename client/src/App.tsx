import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import Dashboard from './components/dashboard';
import { LampDemo } from './components/error';
import Landing from './components/landing';
import Login from './components/login';
import { Toaster } from './components/ui/sonner';
import { db } from './lib/db';
import useStore from './lib/store';

function App() {
  const { setUser, user } = useStore(store => ({
    setUser: store.setUser,
    user: store.user,
  }));

  useEffect(() => {
    (async () => {
      const resp = await db.auth.getUser();
      if (resp.data.user) setUser(resp.data.user);
    })();
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<LampDemo />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
