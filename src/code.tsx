import React, { useRef, useState, useEffect } from 'react';
import { useSpring, a } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { Container, Title, Frame, Content, toggle, TitleWrapper } from './style.ts';
import * as Icons from './icons.tsx';

import { motion } from "framer-motion";

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

const Tree = React.memo<React.HTMLAttributes<HTMLDivElement> & { 
  defaultOpen?: boolean; 
  name: string | JSX.Element; 
  level?: number; 
}>(
  ({ children, name, style, defaultOpen = false, level = 0 }) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    const previous = usePrevious(isOpen);
    const [ref, { height: viewHeight }] = useMeasure();

    const { height, opacity, y } = useSpring({
      from: { height: 0, opacity: 0, y: 0 },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : 20,
      },
    });

    const Icon = children ? (isOpen ? Icons.MinusSquareO : Icons.PlusSquareO) : Icons.CloseSquareO;

    const leftIndent = level * 20; // Ajustar la indentación

    const handleClick = () => {
      // Si el nombre es "Movimiento", redirigimos
      if (name === "Movimiento") {
        window.location.hash = "#/movimiento";
      } else {
        // Si no, solo expandimos o colapsamos
        setOpen(!isOpen);
      }
      if (name === "Inputs") {
        window.location.hash = "#/inputs";
      } else {
        // Si no, solo expandimos o colapsamos
        setOpen(!isOpen);
      }
      if (name === "Colisiones") {
        window.location.hash = "#/colisiones";
      } else {
        // Si no, solo expandimos o colapsamos
        setOpen(!isOpen);
      }
      if (name === "Listas") {
        window.location.hash = "#/listas";
      } else {
        // Si no, solo expandimos o colapsamos
        setOpen(!isOpen);
      }
      if (name === "Eventos") {
        window.location.hash = "#/eventos";
      } else {
        // Si no, solo expandimos o colapsamos
        setOpen(!isOpen);
      }
      if (name === "Interfaz") {
        window.location.hash = "#/interfaz";
      } else {
        // Si no, solo expandimos o colapsamos
        setOpen(!isOpen);
      }
      if (name === "Singletones") {
        window.location.hash = "#/singletones";
      } else {
        // Si no, solo expandimos o colapsamos
        setOpen(!isOpen);
      }
      if (name === "Quaternions") {
        window.location.hash = "#/quaternions";
      } else {
        // Si no, solo expandimos o colapsamos
        setOpen(!isOpen);
        if (name === "Corrutinas") {
          window.location.hash = "#/corrutinas";
        } else {
          // Si no, solo expandimos o colapsamos
          setOpen(!isOpen);
        }
      }
    };

    return (
      <Frame style={{ marginLeft: `${leftIndent}px`, overflow: 'hidden' }}> {/* Aseguramos que el contenedor principal no tenga desbordamiento */}
        <TitleWrapper>
          <Icon
            style={{ ...toggle, opacity: children ? 1 : 0.3 }}
            onClick={handleClick} // Expande o colapsa solo si no es un link
          />
          {/* Solo mostrar la animación y el comportamiento de clic en "Movimiento" */}
          {name === "Movimiento" || name === "Inputs" || name === "Colisiones" || name === "Listas" || name === "Eventos" || name === "Interfaz" || name === "Singletones"
          || name === "Quaternions" || name === "Corrutinas"? (
            <motion.div
              style={{
                cursor: 'pointer',
                transformOrigin: 'center center', // Asegurar el escalado desde el centro
                overflow: 'hidden', // Evitar el desbordamiento
                display: 'inline-block', // Mantener el texto en su lugar
              }}
              whileHover={{ scale: 1.1 }} // Animación al hacer hover
              whileTap={{ scale: 0.8 }}   // Animación al hacer click
              onClick={handleClick} // Manejo del click para redirigir
            >
              <Title style={style}>
                {name}
              </Title>
            </motion.div>
          ) : (
            // Para el resto de los elementos, solo el texto está visible sin animación
            <Title
              style={{ ...style, cursor: 'pointer' }} // Cambiar el cursor al hacer hover
              onClick={handleClick}
            >
              {name}
            </Title>
          )}
        </TitleWrapper>
        <Content
          style={{
            opacity,
            height: isOpen && previous === isOpen ? 'auto' : height,
            overflow: 'hidden', // Evitar las barras de desplazamiento
          }}>
          <a.div ref={ref} style={{ y }} children={children} />
        </Content>
      </Frame>
    );
  }
);

export default function App() {
  return (
    <Container>
      <Tree name="main" defaultOpen level={0}>
        <Tree name="Apuntes 🕹️" level={1}>
          <Tree name="Programación en Unity 🤖" level={2}>
            <Tree name="Movimiento" style={{ color: '#37ceff' }} level={3} />
            <Tree name="Inputs" style={{ color: '#37ceff' }} level={3} />
            <Tree name="Colisiones" style={{ color: '#37ceff' }} level={3} />
            <Tree name="Listas"  style={{ color: '#37ceff' }} level={3}></Tree>
            <Tree name="Eventos"  style={{ color: '#37ceff' }} level={3}></Tree>
            <Tree name="Interfaz"  style={{ color: '#37ceff' }} level={3}></Tree>
            <Tree name="Singletones"  style={{ color: '#37ceff' }} level={3}></Tree>
            <Tree name="Quaternions"  style={{ color: '#37ceff' }} level={3}></Tree>
            <Tree name="Corrutinas"  style={{ color: '#37ceff' }} level={3}></Tree>
          </Tree>
          <Tree name="hello" level={2} />
        </Tree>
        <Tree name="Python 🐍" level={1} />
        <Tree name={"Próximamente..."} level={1} />
      </Tree>
    </Container>
  );
}
