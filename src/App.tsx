import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Landing';
import { Dashboard } from './pages/Dashboard';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [session, setSession] = React.useState<any>(null);

  React.useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route 
        path="/dashboard" 
        element={session ? <Dashboard /> : <Navigate to="/" replace />} 
      />
    </Routes>
  );
};

export default App;
