
import { useContext } from 'react';
import { userContext } from '../../../context/userContext/userContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(userContext);

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      className="flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      {theme === 'light' ? (
        <span className="text-gray-700">🌙</span>
      ) : (
        <span className="text-yellow-300">☀️</span>
      )}
    </button>
  );
}