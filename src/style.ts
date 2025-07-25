import styled from 'styled-components'
import { animated } from '@react-spring/web'

export const Container = styled('div')`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: ui-monospace, monospace;
  font-size: 14px;
  line-height: 21px;
  --webkit-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`

export const Frame = styled('div')`
  position: relative;
  padding: 4px 0px 0px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  vertical-align: middle;
  color: #24292e;
  fill: #24292e;
  display: flex;
  flex-direction: column;  // Mantener la dirección de apilamiento vertical
  align-items: flex-start; // Alinear los elementos a la izquierda
`

// Nuevo contenedor para icono y texto alineados horizontalmente
export const TitleWrapper = styled('div')`
  display: flex;
  flex-direction: row;  // Alineación horizontal de los icono y texto
  align-items: center; // Centra el icono y el texto verticalmente
`

export const Title = styled('span')`
  vertical-align: middle;
`

export const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 20px;  // Desplazamiento de los hijos a la derecha
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed rgba(255, 255, 255, 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;  // Los hijos se apilan verticalmente
`

export const toggle = {
  width: '1em',
  height: '1em',
  marginRight: 10,
  cursor: 'pointer',
  verticalAlign: 'middle',
}
