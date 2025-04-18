
import { useContext } from 'react';
import { userContext } from '../../../context/userContext/userContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(userContext);
  
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50"
    >
      {theme === 'light' ? (
        <span className="text-gray-700 dark:text-gray-300 text-xl">🌙</span>
      ) : (
        <span className="text-yellow-300 text-xl">☀️</span>
      )}
    </button>
  );
}