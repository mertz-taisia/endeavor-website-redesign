import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import AnimationLogoOG from './AnimatedLogoOG.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AnimationLogoOG /> */}
    <App />
  </StrictMode>,
)
