import React, { useEffect, useState } from "react";

const AetherProject = () => {
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const winHeight = window.innerHeight;
    const scrolled = (scrollTop / (docHeight - winHeight)) * 100;
    setProgress(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Barra de progreso */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "10px", // más gorda
          backgroundColor: progress > 0 ? "#aa00ffff" : "transparent", // transparente al inicio
          width: `${progress}%`,
          zIndex: 9999,
          transition: "width 0.2s ease", // animación suave
        }}
      ></div>

      {/* Contenido principal */}
      <div
        style={{
          backgroundColor: "#0d0d0d",
          minHeight: "200vh", // altura para scroll
          padding: "1.5rem",
          color: "#f0f0f0",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.6",
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
        }}
      >
        <h1 style={{ fontSize: "clamp(3rem, 7vw, 5rem)", marginBottom: "1rem", textAlign: "center", }}>
          Aether Project
        </h1>
        <p>Contenido detallado de tu trabajo final del máster</p>
      </div>
    </>
  );
};

export default AetherProject;
