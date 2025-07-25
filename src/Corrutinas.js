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
  });

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
        Corrutinas
      </motion.h1>
      
      <p className="intro-text">Introducción</p>
      
      <p>Una <b>corrutina</b> es un método en Unity que permite ejecutarse de manera pausada, ya sea en cada frame o esperando un tiempo determinado antes de continuar su ejecución</p>
      
      <p><u>¿Para qué se usan?</u></p>
      
      <p>Son útiles en cualquier situación donde necesitemos <b>controlar el tiempo de ejecución</b> de un proceso. Algunos ejemplos son:</p>

      <div style={{ marginLeft: '20px' }}>
        <p><b>· Cinemáticas</b>: Realizar transiciones entre escenas o secuencias animadas</p>
        <p><b>· Seceuncias de comportamiento</b>: Enemigos que patrullan con pausas entre movimientos</p>
        <p><b>· Animaciones del HUD</b>: Desvanecer elementos, mostrar notificaciones con retraso, ...</p>
        <p><b>· Efectos visuales</b>: Parpadeos, cambios de color progresivos o transicones suaves</p>
        <p><b>· Temporizadores</b>: Esperar unos segundos antes de ejecutar una acción</p>
      </div>

      <p><u>Consideraciones</u></p>
      <div style={{ marginLeft: '20px' }}>
        <p><b>· No usar corrutinas para tiempos muy precisos</b>: Dependen del framerate, por lo que pueden tener ligeras variaciones en el tiempo</p>
        <p><b>· No es un hilo de ejecución (Thread)</b>: Las corrutinas no crean un hilo independiente. Siguen ejecutándose en el hilo principal, por lo que pueden afectar el rendimiento del juego</p>
        <p><b>· Pueden detenerse en cualquier momento</b>: Si se desactiva el GameObject que contiene la corrutina, esta se detendrá automáticamente</p>
      </div>
      <br></br>

      <p className="intro-text">Estructura</p>

      <pre className="code-container">
          <code className="language-csharp">
            {`<visibilidad> IEnumerator <NombreCorrutina> (<parámetros>)
{
    yield return <ValorDeRetorno>;
}`}
          </code>
        </pre>
    <p><span className="codetext">IEnumerator</span>: Es el tipo de dato que debe devolver la corrutina</p>
    <p><span className="codetext">yield return</span>: Permite pausar la ejecución de la corrutina y reanudarla después</p>

    <p><u>Ejemplo Básico </u></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public IEnumerator CoroutineTest(string myName)
{
    Debug.Log("Hello " + myName);
    yield return null; // La corrutina termina aquí
}`}
          </code>
        </pre>
      <p><u>¿Qué ocurre en este ejemplo?</u></p>
      <div style={{ marginLeft: '20px' }}>
        <p>Muestra el mensaje <b>"Hello + myName"</b> en la consola</p>
        <p>La corrutina finaliza inmediatamente con <b>yield return null;</b></p>
        <p>En este caso, el método podría ser una función normal porque no hay esperas ni pausas</p>
      </div>

      <p><u>¿Por qué devolver <span className="codetext">null</span>?</u></p>
      <p>Puede ser útil cuando queremos <b>detener la ejecución</b> en una línea específica, sin necesidad de un tiempo de esperando</p>
      
      <br></br>
      <p className="intro-text">Ejecutar una Corrutina</p>
      <p>Para empezar la ejecución de una corrutina, se usa <span className="codetext">StartCoroutine()</span></p>
      
      <pre className="code-container">
          <code className="language-csharp">
            {`public Coroutine StartCoroutine(IEnumerator routine);`}
          </code>
        </pre>
        <p>No se puede ejecutar como un método normal, si no se llama con <span className="codetext">StartCoroutine()</span> no se ejecutará</p>

        <p><u>Ejemplo: Iniciar una Corrutina</u></p>

        <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using UnityEngine;

public class MyTest : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(CoroutineTest("David"));  // Inicia la ejecución con el parámetro David
    }

    public IEnumerator CoroutineTest(string myName)
    {
        Debug.Log("Hello " + myName);  // Se imprime Hello David en la consola
        yield return null; // La corrutina se detiene aquí
    }
}`}
          </code>
        </pre>
    
    
    <p className="intro-text">Tiempos de Espera en Corrutinas</p>
    <p>Cuando usamos corrutinas, podemos hacer que el código espere un tiempo antes de continuar su ejecución</p>

    <p><u>Métodos de Espera Disponibles</u></p>
    
    <pre className="code-container">
          <code className="language-csharp">
            {`// Esperar hasta el final del frame actual
yield return new WaitForEndOfFrame();

// Espera hasta el siguiente FixedUpdate()
yield return new WaitForFixedUpdate();

// Espera un número de segundos
yield return new WaitForSeconds(float seconds);

// Espera un número de segundos sin verse afectado por Time.timeScale
yield return new WaitForSecondsRealtime(float seconds);

// Espera hasta que una condición se cumpla
yield return new WaitUntil(() => condicion);

// Espera mientras una condición sea verdadera
yield return new WaitWhile(() => condicion);`}
          </code>
        </pre>

    <p><u>Ejemplo Práctico: Cuenta atrás</u></p>

    <pre className="code-container">
          <code className="language-csharp">
            {`private IEnumerator Countdown()
{
    for(int i = 3; i >= 0; i--)
    {
        Debug.Log(i);
        yield return new WaitForSeconds(1f); // Espera 1 segundo antes de continuar
    }
    Debug.Log("¡Tiempo terminado!");
};`}
          </code>
        </pre>

        <img 
        src="/images/corrutinaatras.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />

    <br></br>

    <p><u>Ejemplo Práctico: Condiciones</u></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public class TestCoroutines : MonoBehaviour
{
    public int x; // Variable que se incrementará con cada tecla presionada

    void Start() 
    {
        StartCoroutine(CorotuineTest(2f)); // Inicia la corrutina con un tiempo de espera de 2 segundos
    }

    private void Update()
    {
        if (Input.anyKeyDown) // Si el jugador presiona cualquier tecla...
            x++; // Incrementamos 'x'
    }

    private IEnumerator CorotuineTest(float time)
    {
        yield return new WaitForSeconds(time); // Espera 'time' segundos (en este caso, 2s)
        Debug.Log("Hola"); // Imprime "Hola" en la consola

        yield return new WaitWhile(() => x < 7); // Espera mientras 'x' sea menor que 7

        Debug.Log("Caracola"); // Cuando 'x' llega a 7 o más, imprime "Caracola"
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/videocorrutina.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />

      <br></br>
      <p className="intro-text">Bucles while en corrutinas</p>
      <p>Podemos utilizar un bucle <span className="codetext">while</span> infinito dentro de una corrutina para ejecutar código de manera repetitiva en intervalos de tiempo. Esto es útil para acciones que se repiten indefinidamente sin usar <span className="codetext">Update()</span></p>

      <p><u>Ejemplo: Mensaje cada segundo</u></p>

      <pre className="code-container">
          <code className="language-csharp">
            {`public IEnumerator CoroutineTest()
{
    while (true) // Bucle infinito
    {
        Debug.Log("Hello!"); // Se ejecutará cada segundo
        yield return new WaitForSeconds(1f); // Espera 1 segundo antes de repetir
    }
}`}
          </code>
        </pre>
    
    <p><u>Importante:</u> El <span className="codetext">yield return</span> debe estar dentro del <span className="codetext">while</span>, para que no bloquee Unity</p>
    
    <p><b>Detener Corrutinas</b></p>
    <p>Las corrutinas pueden <b>detenerse manualmente</b> cuando ya no son necesarias. Para ello, Unity proporciona dos métodos:</p>

    <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using UnityEngine;

public class MyTest : MonoBehaviour
{
    private Coroutine myCoroutine; // Referencia a la corrutina en ejecución

    void Start()
    {
        // Iniciamos la corrutina y guardamos la referencia
        myCoroutine = StartCoroutine(CoroutineTest());
    }

    void Update()
    {
        // Si el jugador presiona la tecla Espacio, detenemos la corrutina
        if (Input.GetKeyDown(KeyCode.Space))
        {
            StopCoroutine(myCoroutine);
            Debug.Log("Corrutina detenida!");
        }
    }

    // Corrutina que se ejecuta en bucle cada 1 segundo
    private IEnumerator CoroutineTest()
    {
        while (true) // Bucle infinito
        {
            Debug.Log("Hello!"); // Muestra "Hello!" en la consola cada segundo
            yield return new WaitForSeconds(1f); // Espera 1 segundo antes de repetir
        }
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/helloCorrutina.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />
      <div style={{ marginLeft: '20px' }}>
        <p><b>· </b> Solo se puede detener si tenemos <b>su referencia</b></p>
        <p><b>· </b> No podremos detenerla si no almacenamos la referencia <span className="codetext">myCoroutine</span></p>
      </div>
      <br></br>

      <p className="intro-text">Corrutinas que esperan a otras Corrutinas</p>

      <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using UnityEngine;

public class MyTest : MonoBehaviour
{
    void Start()
    {
        // Inicia la corrutina principal que llama a otras corrutinas dentro de ella
        StartCoroutine(CorotuineTest());
    }

    // Corrutina principal
    private IEnumerator CorotuineTest()
    {
        // Espera a que la corrutina Countdown termine antes de continuar
        yield return Countdown();
        
        // Esta línea se ejecutará solo después de que Countdown haya terminado
        Debug.Log("Hello!");
    }

    // Corrutina que hace una cuenta atrás desde 3
    private IEnumerator Countdown()
    {
        for (int i = 3; i >= 0; i--)
        {
            Debug.Log(i);  // Muestra el número actual en la consola
            
            // Espera 1 segundo entre cada número, pero no espera en el cero
            yield return new WaitForSeconds(i == 0 ? 0 : 1); 
        }
    }
}`}
          </code>
        </pre>


  <p><b>Ejemplo Visual de Corrutina</b></p>

  <img 
        src="/images/ejemplocorrutina.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />
      <br></br>
      






      

      </div>

      

    </>
  );
}