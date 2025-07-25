import React, { useEffect, useState } from "react";
import Prism from "prismjs"; // Importar PrismJS
import "prismjs/components/prism-csharp"; // Importar el soporte para C#
import './codigos.css';
import { motion } from 'framer-motion';

export default function App() {
  // Estado para la barra de progreso
  const [progress, setProgress] = useState(0);
  


  // Función para calcular el progreso del scroll
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const winHeight = window.innerHeight;
    const scrolled = (scrollTop / (docHeight - winHeight)) * 100;
    setProgress(scrolled);
  };

  // Cosas del doble code
  const [activeCode, setActiveCode] = useState('codigo1');

  const code1 = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CrazyTank : MonoBehaviour
{
    public float rotationSpeed;
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        transform.Translate(Vector3.forward * 4 * Time.deltaTime);
        transform.Rotate(Vector3.up * rotationSpeed * Time.deltaTime);
    }
}
`;

  const code2 = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyTank : MonoBehaviour
{
    public Transform greenTank;

    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {   
        // Si la distancia al tanque verde es menor de la distancia de detección
        if (Vector3.Distance(transform.position, greenTank.transform.position) <= 10) 
        {
            transform.LookAt(greenTank); // Mira al tanque verde
            transform.Translate(Vector3.forward * 3 * Time.deltaTime); //
        }
    }
}
`;

  // Hook de efecto para añadir el event listener de scroll
  useEffect(() => {
    Prism.highlightAll();  // Asegúrate de que se resalte el código después de que el componente se haya montado
    window.addEventListener("scroll", handleScroll); // Escuchar el evento de scroll

    
    return () => {
      window.removeEventListener("scroll", handleScroll); // Limpiar el listener cuando el componente se desmonte
    };
  }, [activeCode]);

  return (
    <>
      {/* Barra de progreso */}
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      ></div>

      <div className="content">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        Vectores y Movimiento
      </motion.h1>
      <p className="intro-text">Conceptos Fundamentales</p>
      <p><b><u>Ejes de movimiento</u></b></p>
      <p>Los entornos 3D están formados por tres ejes: <b><font color="red">X (horizontal)</font></b>, <b><font color="#90EE90">Y (vertical)</font></b> y <b><font color="blue">Z (profundidad)</font></b>. Estos ejes permiten mover un objeto en distintas direcciones.</p>
      <img 
        src="/images/movement_basic.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
      <p><b><u>Transformaciones</u></b></p>
      <p>Unity usa transformaciones para cambiar la posición, rotación o escala de un objeto. El movimiento se implementa modificando su posición <span className="codetext">transform.Translate</span> o su rotación <span className="codetext">transform.Rotate</span></p>
      <p><b><u>Sistemas de Entrada</u></b></p>
      <p>Los jugadores interactúan con el juego a través de sistemas de entrada (teclado, mouse, mando...). Unity proporciona métodos como <span className="codetext">Input.GetAxis</span> para capturar estas entradas</p>
      <br />
        <p className="intro-text">Uso de Time.deltaTime</p>

        <p>El <span className="codetext">deltaTime</span> se usa para garantizar que el comportamiento en los juegos no dependa de los frames. Para entenderlo mejor usemos un ejemplo:</p>
        
        <p><b>Sin deltaTime</b></p>
        <p>Si tenemos un personaje que se mueve 10 unidades por segundo, al no usar <span className="codetext">deltaTime</span> este sería el código</p>
        <pre className="code-container">
          <code className="language-csharp">
            {`void Update()
{
    transform.Translate(Vector3.forward * 10);  // El personaje se mueve 10 unidades cada frame
}`}
          </code>
        </pre>

        <p>Si el juego se ejecuta a <b>60 FPS</b>, el personaje avanzará 10 unidades por frame</p>
        <p>Si el juego se ejecuta a <b>30 FPS</b>, el personaje avanzará solo 5 unidades por frame, ya que hay menos frames por segundo</p>
        <p>Esto hace que el movimiento dependa de los FPS, siendo injusto para los jugadores</p>

        
        <p><b>Con deltaTime</b></p>
        <p>Si lo usamos, el movimiento será consistente sin importar la tasa de frames</p>
        <pre className="code-container">
          <code className="language-csharp">
            {`void Update()
{
    transform.Translate(Vector3.forward * 10 * Time.deltaTime);  // Usamos deltaTime para hacer el movimiento dependiente del tiempo
}`}
          </code>
        </pre>

        <p><span className="codetext">Time.deltaTime</span> es el tiempo que ha pasado desde el último frame</p>
        <p>Si el juego tiene <b>60 FPS</b>, <span className="codetext">deltaTime</span> será un valor pequeño (0.016 segundos)</p>
        <p>Si el juego tiene <b>30 FPS</b>, <span className="codetext">deltaTime</span> será un valor más grande (0.033 segundos)</p>

        <p>De esta forma, el personaje siempre se moverá 10 unidades por segundo, sin importar la cantidad de FPS</p>
        <img 
          src="/images/nodelta.gif" 
          alt="Ejemplo sin Delta" 
          className="vertical-gif" 
      />
        <img 
            src="/images/delta.gif" 
            alt="Ejemplo con Delta" 
            className="vertical-gif" 
        />

        <p className="intro-text">Modificar posición</p>
        <p>En Unity, <span className="codetext">transform.Translate</span> nos permite trasladar un objeto en una dirección. Este método se aplica al componente Transform de un objeto, que define su posición, rotación y escala</p>
        <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
  public float speed;
  void Update()
  {
      // Traslada el objeto hacia su frente
      transform.Translate(Vector3.forward * speed * Time.deltaTime);
  }
}`}
          </code>
        </pre>

        <p className="intro-text">Rotación en Unity</p>
        <p>De la misma manera, el método <span className="codetext">transform.Rotate</span> nos permite cambiar la orientación de un objeto. De esta forma podemos rotar un objeto un número de grados sobre un eje</p>
        <pre className="code-container">
          <code className="language-csharp">
            {`public class Test: MonoBehaviour
{
 public float rotationSpeed;

 void Update()
 {
      // Gira el objeto sobre el eje Y en sentido horario
      transform.Rotate(Vector3.up * rotationSpeed * Time.deltaTime);
  }
}`}
          </code>
        </pre>
        <p>El componente <span className="codetext">Transform</span> almacena la posición, rotación y escala del objeto</p>

        <pre className="code-container">
          <code className="language-csharp">
{`transform.position     // Accede a la posición del objeto (Vector3)
transform.rotation    // Accede a la rotación del objeto (Quaternion)
transform.localScale // Accede a la escala local del objeto (Vector3)  
`}
          </code>
        </pre>
        <p>Es posible crear variables tipo Transform para referenciarlos en el código</p>
        <pre className="code-container">
          <code className="language-csharp">
{`public Transform otherTransform; 
`}
          </code>
        </pre>

        <p className="intro-text">Distancia en Unity</p>
        <p>En los videojuegos, la distancia entre dos objetos es crucial para definir comportamientos como:</p>
        <div style={{ marginLeft: '20px' }}>
        <p><b>·</b> Saber si un jugador está cerca de un enemigo</p>
        <p><b>·</b> Activar un evento cuando se alcanza un objetivo</p>
        <p><b>·</b> Implementar efectos visuales o sonoros basados en la cercanía</p>
      </div>
      <p>Para estos casos, el método <span className="codetext">Vector3.Distance</span> devuelve la distancia entre dos posiciones del espacio</p>
        <pre className="code-container">
          <code className="language-csharp">
{`float distance = Vector3.Distance(pointA, pointB);

// Distancia entre el objeto y el centro de coordenadas
float distance = Vector3.Distance(transform.position, Vector3.zero)  
`}
          </code>
        </pre>
        <p className="intro-text">Transform.LookAt</p>
        <p>Este método de Unity hace que un objeto "mire" hacia otro. Para ello se ajusta la rotación del objeto para qeu su eje forward (hacia adelante) apunte hacia la posición del objeto</p>
        <pre className="code-container">
          <code className="language-csharp">
{`public class Test: MonoBehaviour
  {
    public Transform target;
    void Update()
    {
      transform.LookAt(target);
    }
}`}
          </code>
        </pre>
    <p>También sirve para objetos del tipo <b>Position</b></p>

    <p className="intro-text">Ejemplo práctico</p>
    <p>Se van a crear dos scripts:</p>
    <p><span className="codetext">EnemyTank</span>: El tanque enemigo persigue al tanque verde si está a 10 o menos metros de distancia</p>
    <p><span className="codetext">CrazyTank</span>: El tanque verde se mueve por la zona atrayendo a los tanques enemigos</p>
    <img 
        src="/images/ejemplo_quieto.png" 
        alt="Escena" 
        className="movement-gif" 
      />
      <p><b>Solución</b></p>

    <div className="code-container2">
      <div className="code-header">
        {/* Selector de pestañas */}
        <button
          className={`tab-button ${activeCode === 'codigo1' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo1')}
        >
          CrazyTank
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo2' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo2')}
        >
          EnemyTank
        </button>
      </div>

      {/* Aquí se muestra el código basado en la selección */}
      
        {activeCode === 'codigo1' && (
          <pre className="code-content">
            <code className="language-csharp">{code1}</code>
          </pre>
        )}
        {activeCode === 'codigo2' && (
          <pre className="code-content">
          <code className="language-csharp">{code2}</code>
        </pre>
        )}
      </div>
      <br></br>
      <img 
        src="/images/ejemplo_movimiento.gif" 
        alt="Escena con solución" 
        className="movement-gif" 
      />

      </div>

      

    </>
  );
}