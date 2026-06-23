import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './App.css';
import { AppProvider } from './context/AppContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

// 🌙 APPLY DARK MODE EARLY
const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>
);
