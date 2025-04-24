// @ts-nocheck
import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/LandingPage.tsx';
import LogoAnimation from './components/LogoAnimation.tsx';

// This component will log route changes
function RouteLogger() {
  const location = useLocation();
  
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteLogger />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animation" element={<LogoAnimation />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;