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


  // Hook de efecto para añadir el event listener de scroll
  useEffect(() => {
    Prism.highlightAll();  // Asegúrate de que se resalte el código después de que el componente se haya montado
    window.addEventListener("scroll", handleScroll); // Escuchar el evento de scroll

    
    return () => {
      window.removeEventListener("scroll", handleScroll); // Limpiar el listener cuando el componente se desmonte
    };
  },);

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
        Inputs y Axes
      </motion.h1>
      <p className="intro-text">Conceptos Fundamentales</p>
      <p>En videojuegos, los inputs son señales enviadas por el jugador mediante dispositivos de entrada como teclados, ratones, mandos o pantallas táctiles. Estos se traducen en acciones dentro del juego como moverse, disparar o pausar el juego</p>
      
      <p><b><u>Inputs de teclado</u></b></p>
      <p>Detectan los cambios producidos en una tecla del teclado</p>
      <pre className="code-container">
          <code className="language-csharp">
            {`bool Input.GetKey(KeyCode key)      // Tecla mantenida
bool Input.GetKeyDown(KeyCode key) // Tecla pulsada
bool Input.GetKeyUp(KeyCode key)  // Tecla soltada `}
          </code>
        </pre>     
      
      <p><b><u>Inputs de ratón</u></b></p>
      <p>Detectan los cambios producidos en un botón del ratón</p>   
      <pre className="code-container">
          <code className="language-csharp">
            {`bool Input.GetMouseButton(int button)      // Botón mantenido
bool Input.GetMouseButtonDown(int button) // Inicio del clic
bool Input.GetMouseButtonUp(int button)  // Fin del clic`}
          </code>
        </pre>  
        

    <p className="intro-text">Fixed Update</p>
    <p>El método <span className="codetext">FixedUpdate</span> es una función diseñada para manejar lógica relacionada con la física y otras operaciones que deben ejecutarse a intervalos consistentes. </p>
    <p>A diferencia de <span className="codetext">Update</span> (que se ejecuta una vez por frame), <span className="codetext">FixedUpdate</span> se ejecuta en intervalos de tiempo fijos, independientemente de los FPS</p>
    
    
    <p><b><u>Consejos</u></b></p>
    <p>Usar Rigidbody para Física: Maneja movimientos físicos exclusivamente a través de <b>Ribidbogdy</b></p>
    <p>Separa la Lógica: Divide el input del jugador <span className="codetext">Update</span> y la aplicación de físicas <span className="codetext">FixedUpdate</span></p>
    <p>Su comportamiento está ligado al tiempo del juego: Esto significa que <span className="codetext">Time.timeScale</span> afecta a la frecuencia con la que se ejecuta</p>
    
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test: MonoBehaviour
{
  public Rigidbody rb;
  void Start() {
      // Inicializa el Rigidbody del GameObject
      rb = GetComponent<Rigidbody>();
    }
  void FixedUpdate() {
      rb.AddForce(10.0f * Vector3.up); // Internamente hace el deltaTime
    }
}`}
          </code>
        </pre> 

    
        <img 
            src="/images/rb.gif" 
            alt="Rigidbody ejemplo" 
            className="vertical-gif" 
        />

      
    <p className="intro-text">Control de Pulsación</p>  
    <p>Los métodos <span className="codetext">Input.GetKeyDown</span> y <span className="codetext">Input.GetKeyUp</span> devuelven true únicamente durante el frame exacto que se presiona o suelta la tecla. Si no se detecta dentro de ese frame, se pierde la acción</p>

    
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
  void FixedUpdate()
  {
      if(Input.GetKeyDown(KeyCode.Space))
        Debug.Log("He pulsado espacio");

      if(Input.GetKeyUp(KeyCode.Space))
        Debug.Log("He soltado espacio");
      }
}`}
          </code>
        </pre> 

    
    <p>En este código, si la tecla espacio es pulsada o soltada entre dos llamadas el evento no se detectará</p>
    <p>Para evitar problemas, se usa una variable booleana de control y el método <span className="codetext">GetKey</span></p>

    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
  private bool spacePressed;
      void FixedUpdate(){
        if(Input.GetKey(KeyCode.Space) && !spacePressed){
            spacePressed = true;
            Debug.Log("He pulsado espacio");
        }
 
       if(!Input.GetKey(KeyCode.Space) && spacePressed){
            spacePressed = false;
            Debug.Log("He soltado espacio");
        }
    }
}`}
          </code>
        </pre>


    <p>La variable de control <span className="codetext">spacePressed</span> actúa como un estado que rastrea si la tecla está actualmente presionada o no</p>

    <p>Sin embargo, lo recomendable es gestionar el <span className="codetext">Input</span> en el <span className="codetext">Update</span> y realizar las acciones relacionadas con las físicas en <span className="codetext">FixedUpdate</span></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
  bool doJump;
  void Update(){
      if(Input.GetKeyDown(KeyCode.Space))
        doJump = true;
      }
 
  void FixedUpdate(){
      if(doJump){
        // Do actions
        doJump = false;
      }
  }  
}
`}
          </code>
        </pre>

  
  <p className="intro-text">Input Axes</p>  
  <p>El método <span className="codetext">Input.GetAxis</span> toma el nombre de un eje configurado y devuelve un valor continuo entre -1 y 1. Este valor representa la intensidad de entrada en ese eje</p>
  <p>Con este método el valor cambia suavemente con el tiempo, proporcionando una experiencia de entrada más fluida</p>
  
  <p className="intro-text">Input Axes Raw</p>
  <p>Si se necesita una respuesta más directa y menos suave, se puede usar <span className="codetext">Input.GetAxisRaw</span>. Este método devuelve un valor directo de -1, 0 o 1 sin interpolación </p>

  
  <pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;

public class Movement : MonoBehaviour
{
    public float movementSpeed = 3f;  // Velocidad de movimiento
    public float rotationSpeed = 180f; // Velocidad de rotación

    private float h, v;  // Variables para almacenar entradas del jugador

    void Update()
    {
        // Capturar entrada del teclado
        h = Input.GetAxisRaw("Horizontal"); // Movimiento en el eje X
        v = Input.GetAxisRaw("Vertical");   // Movimiento en el eje Z

        // Aplicar movimiento y rotación
        transform.Translate(Vector3.forward * movementSpeed * v * Time.deltaTime);
        transform.Rotate(Vector3.up * rotationSpeed * h * Time.deltaTime);
    }

}
`}
          </code>
        </pre>

      <br></br>
        <img 
            src="/images/tanque.gif" 
            alt="Axis Raw ejemplo" 
            className="movement-gif" 
        />


  <p>Unity incorpora una serie de Axes predefinidos</p>
  <p>Estos ejes se pueden personalizar y se pueden editar las configuraciones predeterminadas (Edit &gt; Project Settings &gt; Input Manager)</p>

  <p className="intro-text">Rigidbody.MovePosition</p>
  <p>El método <span className="codetext">Rigidbody.MovePosition</span> se usa para mover un Rigidbody a una posición específica, manteniendo la coherencia con el sistema de físicas de Unity</p>
  <p>Es una alternativa adecuada para evitar manipulaciones manuales como <span className="codetext">transform.position</span>, ya que pueden causar problemas con el motor de físicas</p>
  <p>Se recomienda usar este método dentro de <span className="codetext">FixedUpdate</span></p>
      
  <p className="intro-text">Ejemplo Práctico</p>
  <p>Los tanques deben desplazarse hacia delante y hacia atrás usando los ejes de Unity</p>
  <p>Desplaza los tanques mediante su Rigidbody</p>
  <p>El movimiento tiene aceleración/desaceleración de eje, la rotación no</p>
  <p>El tanque azul debe tener controles distintos</p>
  <img 
            src="/images/ejemplo_rb.png" 
            alt="ejemplo axis" 
            className="movement-gif" 
        />

  <p><b>Solución</b></p>
  <p>Lo primero es crear un eje nuevo para el segundo tanque con otros controles (Vertical2 y Horizontal2)</p>

  <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TankController : MonoBehaviour
{
    public string moveAxis, rotateAxis; // Ejes para mover y rotar
    public float moveSpeed; // Velocidad de movimiento
    public float rotationSpeed; // Velocidad de rotación
    private Rigidbody rB; // Referencia para al macenar el rigidbody del objeto

    private void Awake()
    {
        rB = GetComponent<Rigidbody>(); // Coge el componente 'Rigidbody' y lo almacena
    }

    void Update()
    {
        float h = Input.GetAxisRaw(rotateAxis); // Almaceno en 'h' el valor del eje de rotación (para valores enteros)
        transform.Rotate(Vector3.up * h * rotationSpeed * Time.deltaTime); // Roto teniendo en cuenta el valor del eje (h)
    }

    void FixedUpdate()
    {
        float v = Input.GetAxis(moveAxis); // Almaceno en 'v' el valor del eje de movimiento
        rB.MovePosition(rB.position + transform.forward * v * moveSpeed * Time.deltaTime); // Muevo teniendo en cuenta el valor del eje (v)
    }
}

`}
          </code>
        </pre>

  <p>Una vez añadimos el código a los dos tanques solo hay que elegir en el Inspector las características de cada uno</p>
  
  

  <img 
          src="/images/tanqueverde.png" 
          alt="configuracion 1" 
          className="vertical-gif" 
      />
        <img 
            src="/images/tanqueazul.png" 
            alt="configuracion2" 
            className="vertical-gif" 
        />
<p>Con esta configuración un tanque se mueve con WASD y el otro con las flechas</p>
<img 
            src="/images/ejemplo2.gif" 
            alt="ejemplo rb" 
            className="movement-gif" 
        />

  <p className="intro-text">Otro tipo de movimiento</p>
  <p>Otro tipo de movimiento usado en varios juegos con teclado es el control de <b>8 direcciones</b></p>
  <p>En este caso lo haremos sin aceleración de ejes y que se mueva con Transform</p>
      
  <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TankControllerKeys : MonoBehaviour
{
    public string horizontalAxis, verticalAxis; // Ejes para mover el tanque
    public float moveSpeed; // Velocidad de movimiento

    void Update()
    {
        float h = Input.GetAxisRaw(horizontalAxis) ; // Almaceno en 'h' el valor del eje horizontal (que invertimos en caso de ser reflejado)
        float v = Input.GetAxisRaw(verticalAxis); // Almaceno en 'v' el valor del eje vertical

        if (h != 0 || v != 0) // Si interactúo con alguno de los ejes
        {
            transform.LookAt(transform.position + new Vector3(h, transform.position.y, v)); // Miro al punto en el que está el objeto más un desplazamiento en función del valor de los ejes
            transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime); // Traslado el tanque hacia el frente con transform
        }
    }
}
`}
          </code>
        </pre>  

  <p>Este código permite moverse en diagonal mediante el uso de dos teclas pulsadas a la vez</p> 

  <img 
            src="/images/direcciones.gif" 
            alt="ejemplo 8 direcciones" 
            className="movement-gif" 
        />


      </div>

      

    </>
  );
}