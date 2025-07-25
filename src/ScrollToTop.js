// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Desplaza la página al tope al cambiar la ruta
    window.scrollTo({
      top: 0,
      behavior: 'auto', // puedes usar 'auto' si no quieres scroll animado
    });
  }, [pathname]);

  return null;
}
