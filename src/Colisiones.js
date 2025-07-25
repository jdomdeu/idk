import React, { useEffect, useState } from "react";
import Prism from "prismjs"; // Importar PrismJS
import "prismjs/components/prism-csharp"; // Importar el soporte para C#
import './codigos.css';
import { motion } from 'framer-motion';

export default function App() {
  // Estado para la barra de progreso
  const [progress, setProgress] = useState(0);
  
  const styles = {
    table: {
      borderCollapse: "collapse",
      width: "100%",
      margin: "20px 0",
      fontFamily: 'monospace',
      border: "2px solid #333",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0px 4px 6px rgba(0, 0, 5, 0.5)",
    },
    headerCell: {
      backgroundColor: "#7d42b8", // Color de fondo para el encabezado
      color: "white", // Color del texto
      fontWeight: "bold",
      padding: "12px",
      textAlign: "center",
      borderBottom: "2px solid #ddd",
    },
    cell: {
      padding: "10px",
      textAlign: "left #ddd",
      borderBottom: "2px solid #b2adb8",
      border: "2px solid #b2adb8",
      backgroundColor: "#f9f9f9", // Fondo alternativo
      color: "#333",
    },
  };

  const styles1 = {
    table: {
      borderCollapse: "collapse",
      width: "100%",
      margin: "20px 0",
      fontFamily: "monospace",
      border: "2px solid #333",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0px 4px 6px rgba(0, 0, 5, 0.5)",
    },
    cell: {
      padding: "10px 15px", // Añade un poco de espacio a la izquierda
      textAlign: "left",    // Alinea el texto a la izquierda
      borderBottom: "2px solid #b2adb8",
      border: "2px solid #b2adb8",
      backgroundColor: "#f9f9f9", // Fondo alternativo
      color: "#333",
    },
  };
  


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

public class spawner : MonoBehaviour
{
    public GameObject objPrefab; // Objeto a spawnear
    public float spawnTime; // Tiempo entre spawns
    public float spawnDelay; // Tiempo que debe esperar para empezar a instanciar

    void Start()
    {
        // Usa un InvokeRepeating para llamar al spawn cada 'x' tiempo con tiempo de delay
        InvokeRepeating("Spawn", spawnDelay, spawnTime); 
    }

    private void Spawn()
    {
        // Instancio el objeto en esa posición
        Instantiate(objPrefab, transform.position, transform.rotation); 
    }
}`;

  const code2 = `using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class Orcos : MonoBehaviour
{
    public float moveSpeed; // Velocidad de movimiento
    public float checkDistance; // Distancia del raycast
    public LayerMask obstacleMask; // Layers en los que se encuentran los obstaculos
    private RaycastHit hit; // Guarda información del hit del raycast
    

    // Update is called once per frame
    void Update()
    {
        // Tira un raycast al frente a una distancia
        if (Physics.Raycast(transform.position, transform.forward, out hit, checkDistance, obstacleMask)) 
        {
            if (hit.collider.tag == "wall2") // Si choca con la herrería
                transform.Rotate(Vector3.up * -90); // Rota el objeto 90º a la izquierda
            else
                transform.Rotate(Vector3.up * 90); // Rota el objeto 90º a la derecha
        }
        transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime); // Se mueve al frente a una velocidad en el tiempo
    
        Debug.DrawRay(transform.position, transform.forward* checkDistance, Color.yellow); // Debug del rayo que se lanza
    }

    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag == "Player") // Si colisiona con algo que tenga el tag 'Player' (herrería)
            Destroy(collision.gameObject); // Destruye al Player
    }
}`;

const code3 = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Base : MonoBehaviour
{
    public GameObject objPrefab;

    private void OnMouseDown()
    {
        // Al pulsar con el ratón encima del collider se pone el prefab del cañón
        Instantiate(objPrefab, transform.position, transform.rotation);

        // Destruye el objeto de la base para que no se pueda volver a pulsar
        Destroy(gameObject);
    }
}`;

const code4 = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Canion : MonoBehaviour
{
    public GameObject bulletPrefab; // Prefab de la bala
    public float shootSpeed; // Balas por segundo
    public Transform bulletStart; // Punto de inicio y orientación de las balas
    private Transform target; // Objetivo al que debe disparar
    private bool canShoot = true; // Establece si puede disparar el cañçon

    void Update()
    {
        if (target != null) // Si tiene objetivo
        {
            transform.LookAt(target); // Mira al objetivo
            if (canShoot) // Si puede disparar
                Shoot(); // Dispara
        }
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Enemy") // Si un enemigo entra en su área
            target = other.transform; // Ese será su objetivo actual
    }

    void OnTriggerExit(Collider other)
    {
        // Si un enemigo sale de su área de alcance y era su objetivo actual
        if (other.tag == "Enemy" && other.gameObject == target) 
            target = null; // Ya no tiene objetivo
    }

    private void Shoot()
    {
        // Instancia el prefab de la bala en la posición y rotación determinada por bulletStart
        Instantiate(bulletPrefab, bulletStart.position, bulletStart.rotation); 
        canShoot = false; // Ya no puede disparar
        Invoke("RestoreShoot", 1 / shootSpeed); // Usa un invoke para restablecer el poder disparar
    }

    private void RestoreShoot()
    {
        canShoot = true; // Ahora puede disparar
    }
}`;

const code5 = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Health : MonoBehaviour
{
    public int hits; // Numero de golpes a recibir antes de morir

    public void Hit() // Método para recibir un golpe
    {
        hits--; // Reduzco el número de golpes
        if (hits <= 0) // Si es 0 o menor
        {
            Destroy(gameObject); // Destruye el objeto que posee este script
        }
    }
}`;

const code6 = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class bala : MonoBehaviour
{
    public float lifeTime;
    void Start()
    {
        Destroy(gameObject, lifeTime);
    }

    // Update is called once per frame
    void Update()
    {
        // La bala va recta 
        transform.Translate(Vector3.forward * 12 * Time.deltaTime);
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Enemy") // Si con lo que choca tiene el tag 'Enemy'
        {
            if (other.GetComponent<Health>()) // Si tiene componente de salud 
                other.GetComponent<Health>().Hit(); // Recibe un golpe
            else // Si no tiene componente de salud
                Destroy(other.gameObject); // Destruye el objeto con el que choca
            Destroy(gameObject); // Destruye la bala
        }
    }
}`;

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
        Colisiones y Raycast
      </motion.h1>
      <p className="intro-text">Colisiones Físicas</p>
      <p>En Unity, las colisiones físicas son interacciones entre objetos que son gestionadas por el motor de físicas. Este tipo de colisiones simulan el comportamiento de objetos reales y permiten que los elementos del juego reboten, choquen, se detengan, ... </p>

      <p><b>Requisitos</b></p>
      <p>Para que las colisones físicas funcionen correctamente se necesita:</p>
      <p><u>1. Rigidbody</u></p>
      <div style={{ marginLeft: '20px' }}>
        <p><b>·</b> Al menos uno de los objetos debe tener un componente <span className="codetext">Rigidbody</span>. Sin este el motor de físicas no puede gestionar el movimiento ni las fuerzas</p>
      </div>
      <p><u>2. Collider</u></p>
      <div style={{ marginLeft: '20px' }}>
        <p><b>·</b> Los dos objetos deben tener un componente <span className="codetext">Collider</span> habilitado</p>
        <p><b>·</b> Si uno de los <span className="codetext">Collider</span> tiene la opción <b>Is Trigger</b> activada, el motor de físicas no detectará las colisiones físicas. Aunque se podrán gestionar diferentes eventos</p>
      </div>

      <p><b>Detección de Colisiones</b></p>
      <p>Unity ofrece tres métodos principales para gestionar colisiones físicas en objetos con Rigidbody</p>
      <pre className="code-container">
          <code className="language-csharp">
            {`void OnCollisionEnter(Collision collision) 
// Cuando ocurre el primer contacto entre dos objetos --> se produce la colisión

void OnCollisionExit(Collision collision)
// Cuando los objetos dejan de colisionar --> finaliza la colisión

void OnCollisionStay(Collision collision) 
// Cuando los objetos permanecen en contacto --> mientras están colisionando`}
          </code>
        </pre>

      <p><b>Información de las Colisiones</b></p>
      <p>El objeto <span className="codetext">Collision</span> tiene información útil sobre la colisión:</p>
      <div style={{ marginLeft: '20px' }}>
        <p><b>collision.gameObject:</b> Referencia al objeto con el que se ha colisionado</p>
        <p><b>collision.collider:</b> El <span className="codetext">Collider</span> específico que detectó la colisión</p>  
        <p><b>collision.contacts:</b> Información sobre los puntos de contacto entre los objetos</p>     
      </div>
      <p><u>Ejemplo</u></p>
      <pre className="code-container">
          <code className="language-csharp">
            {`void OnCollisionEnter(Collision collision)
{
    Debug.Log(collision.gameObject); // Muestra el objeto con el que colisiona

    if(collision.gameObject.tag == “Player”) // Tag del objeto con el que colisiona
        Debug.Log(“Player Hit”);

    if(collision.collider.tag == "Head") // Tag del collider con el que ha colisionado
        Debug.Log("BOOM! Headshot!");
}`}
          </code>
        </pre>
    <br></br>
    <p><b>Buenas Prácticas</b></p>
    <p>Evita usar <span className="codetext">OnColliderStay</span>, es mejor usar Enter y Exit con lógica booleana</p>
      
    <br></br>
    <p className="intro-text">Colisiones Lógicas</p>
    <p>Las colisiones lógicas son aquellas en las que los objetos interactúan mediante colliders configurados como <span className="codetext">Triggers</span>. En estas colisiones no hay simulación de físicas; estas son usadas para detectar entradas, salidas y permanencias en zonas específicas</p>

    <p><b>Requisitos</b></p>
    <p>Para que las colisones lógicas funcionen correctamente se necesita:</p>
    <p><u>1. Colliders</u></p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>·</b> Los dos objetos deben tener un componente <span className="codetext">Collider</span> habilitado</p>
        <p><b>·</b> Al menos uno de los colliders debe tener la opción <span className="codetext">Is Trigger</span> activada</p>
        <p><b>·</b> Esto permite que el collider se comporte como un área que detecta entradas y salidas</p>
    </div>
    <p><u>2. Rigidbody</u></p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>·</b> Al menos uno de los objetos debe tener un componente <span className="codetext">Rigidbody</span></p>
        <p><b>·</b> De esta forma el motor de físicas detecta las colisiones, incluso si no hay interacción física</p>
    </div>
    <p><b>Detección de Colisiones</b></p>
      <p>Unity ofrece tres métodos principales para gestionar colisiones lógicas</p>
      <pre className="code-container">
          <code className="language-csharp">
            {`void OnTriggerEnter(Collider other)
// Se ejecuta una vez cuando otro collider entra en el área del Trigger

void OnTriggerExit(Collider other)
// Se ejecuta una vez cuando otro collider sale del área del Trigger

void OnTriggerStay(Collider other)
// Se ejecuta mientras otro collider permanece dentro del área del Trigger`}
          </code>
        </pre>
    
    <p><b>Información de las Colisiones</b></p>
    <p>El objeto <span className="codetext">Collider</span> contiene la información importante de "el otro objeto" que participa en la colisión:</p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>other.gameObject:</b> Referencia al objeto que posee el collider</p>
        <p><b>other.attachedRigidbody:</b> Referencia al <span className="codetext">Rigidbody</span> del objeto al que está asociado el collider</p>     
      </div>
      <p><u>Ejemplo</u></p>
      <pre className="code-container">
          <code className="language-csharp">
            {`void OnTriggerEnter(Collider other)
{
  // Objeto que posee el collider
  Debug.Log(other.gameObject); 
  
  // Objeto que posee el Rigidbody al cual está ‘atado’ el collider
  Debug.Log(other.attachedRigidbody.gameObject); 

  // Si donde está el collider hay componente Health
  if(other.GetComponent<Health>())          
      other.GetComponent<Health>().Hit();  // Accede al componente Health
}`}
          </code>
        </pre>

        <p><b>Buenas Prácticas</b></p>
        <p>Evita usar <span className="codetext">OnTriggerStay</span>, es mejor usar Enter y Exit con lógica booleana</p>

  <p className="intro-text">Diferencias</p>
    
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.headerCell}>Característica</th>
          <th style={styles.headerCell}>Colisiones Físicas</th>
          <th style={styles.headerCell}>Colisiones Lógicas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={styles.cell}><b>Interacción Física</b></td>
          <td style={styles.cell}>Sí (simulación de fuerzas)</td>
          <td style={styles.cell}>No (solo detección)</td>
        </tr>
        <tr>
          <td style={styles.cell}><b>Uso de 'Is Trigger'</b></td>
          <td style={styles.cell}>Desactivado</td>
          <td style={styles.cell}>Activado en al menos un collider</td>
        </tr>
        <tr>
          <td style={styles.cell}><b>Métodos Principales</b></td>
          <td style={styles.cell}>OnCollisionEnter, OnCollisionExit...</td>
          <td style={styles.cell}>OnTriggerEnter, OnTriggerExit...</td>
        </tr>
        <tr>
          <td style={styles.cell}><b>Propósito Común</b></td>
          <td style={styles.cell}>Impactos, bloqueos físicos</td>
          <td style={styles.cell}>Detección de zonas o activación de eventos</td>
        </tr>
      </tbody>
    </table>    
    
      <img 
        src="/images/collision.gif" 
        alt="Diferencias" 
        className="movement-gif" 
      />

        <p className="intro-text">Colisiones 2D</p>

        <p>En Unity, las colisiones 2D se gestionan de manera independiente a las colisiones 3D, usando componentes y métodos específicos</p>
        
        <p><b>Aspectos generales</b></p>
        <div style={{ marginLeft: '20px' }}>
          <p><b>·</b> Los métodos y componentes para colisiones 2D son diferentes de los usados en 3D</p>
          <p><b>·</b> Al menos uno de los objetos involucrados debe tener un <span className="codetext">RigidBody2D</span></p>
        </div>

        <p><u>Colisiones físicas en 2D</u></p>

        <pre className="code-container">
          <code className="language-csharp">
            {`void OnCollisionEnter2D(Collision2D collision) // Cuando se produce la colisión
void OnCollisionExit2D(Collision2D collision) // Cuando finaliza la colisión
void OnCollisionStay2D(Collision2D collision) // Mientras estén colisionando`}
          </code>
        </pre>

        <p><u>Colisiones lógicas en 2D</u></p>

        <pre className="code-container">
          <code className="language-csharp">
            {`void OnTriggerEnter2D(Collider2D other) // Cuando entra en el área
void OnTriggerExit2D(Collider2D other) // Cuando sale del área
void OnTriggerStay2D(Collider2D other) // Mientras esté en el área`}
          </code>
        </pre>

        <p className="intro-text">Matriz de colisiones</p>
        <p>La Matriz de Colisiones permite controlar y optimizar qué <b>Layers</b> pueden interactuar entre sí mediante colisiones físicas o lógicas</p>
        
        <p><b>Configuración</b></p>
        <p>En el menú principal de Unity:</p>
        <div style={{ marginLeft: '20px' }}>
          <p><b>·</b> Edit --&gt; Project Settings --&gt; Physics (colisiones 3D)</p>
          <p><b>·</b> Edit --&gt; Project Settings --&gt; Physics 2D (colisiones 2D)</p>
        </div>
        <p>Buscar la <b>Collision Matrix</b> que aparece como una tabla con filas y columnas</p>
        <img 
        src="/images/matriz.gif" 
        alt="Collision Matrix" 
        className="vertical-gif" 
      />

      <p><b>Funcionamiento</b></p>
      <p><u>Filas y Columnas</u></p>
      <div style={{ marginLeft: '20px' }}>
          <p><b>·</b> Cada fila y columna representa un <b>Layer</b> de Unity</p>
          <p><b>·</b> Los <b>Layers</b> son categorías que puedes asignar a objetos en el Inspector</p>
        </div>

      <p><u>Casillas</u></p>
      <div style={{ marginLeft: '20px' }}>
          <p><b>·</b> Cada casilla en la matriz indica si dos Layers pueden colisionar entre sí</p>
          <p><b>· Marcada (✔️)</b>: Los objetos de esos Layers pueden interactuar</p>
          <p><b>· Desmarcada (❌)</b>: No habrá interacción entre esos Layers</p>
        </div>

        <img 
        src="/images/collider_example.gif" 
        alt="Ejemplo Matriz" 
        className="movement-gif" 
      />
      
      <p className="intro-text">Fallos en la detección de colisiones</p>
      <p>Si tienes problemas para que se detecte una colisión revisa esta lista</p>
      <table style={styles1.table}>
      <tbody>
        <tr>
          <td style={styles1.cell}>1) Los dos objetos tienen Collider y corresponden a su dimensión (2D o 3D)</td>
        </tr>
        <tr>
          <td style={styles1.cell}>2) Al menos uno de los dos objetos tiene Rigidbody</td>
        </tr>
        <tr>
          <td style={styles1.cell}>3) Los métodos están bien escritos (no hay errores de spelling)</td>
        </tr>
        <tr>
          <td style={styles1.cell}>4) Has usado el parámetro correcto Collision --&gt; Collision, Trigger --&gt; Collider</td>
        </tr>
        <tr>
          <td style={styles1.cell}>5) Si trabajas en 2D los métodos y parámetros llevan el 2D</td>
        </tr>
        <tr>
          <td style={styles1.cell}>6) La casilla 'Is Trigger' del collider está de la manera que deseas</td>
        </tr>
        <tr>
          <td style={styles1.cell}>7) Si trabajas con Tags has añadido el tag correspondiente al objeto</td>
        </tr>
        <tr>
          <td style={styles1.cell}>8) Has añadido el script al objeto</td>
        </tr>
        <tr>
          <td style={styles1.cell}>9) La matriz de colisiones permite que ambos objetos colisionen</td>
        </tr>
        <tr>
          <td style={styles1.cell}>10) Reinicia Unity…</td>
        </tr>
      </tbody>
    </table>  

    <p>Si tras todo esto sigue sin funcionar, empieza rezar</p>
        

    <p className="intro-text">Raycast</p>    
    <p>El <span className="codetext">Raycast</span> es una herramienta esencial en Unity que permite detectar colisiones a lo largo de una línea proyectada desde un punto de origen en una dirección específica</p>
            
    <pre className="code-container">
          <code className="language-csharp">
            {`bool Raycast(Vector3 origin, Vector3 direction, float maxDistance)`}
          </code>
        </pre>
    
      <div style={{ marginLeft: '20px' }}>
        <p><b>· origin:</b> Punto de partida del rayo</p>
        <p><b>· direction:</b> La dirección del rayo (vector normalizado)</p>
        <p><b>· maxDistance</b> La distancia máxima que recorre el rayo</p>
      </div>
      <p>Devuelve un valor booleano: <span className="codetext">true</span> si el rayo colisiona con algo y <span className="codetext">false</span> si no colisiona con ningún objeto</p>

      <img 
        src="/images/raycast.png" 
        alt="Raycast ejemplo" 
        className="movement-gif" 
      />
      <br></br>

<img 
        src="/images/raycast chocando.png" 
        alt="Raycast chocando ejemplo" 
        className="movement-gif" 
      />

    <p><b>Filtrar Objetos</b></p>
    <p>El <span className="codetext">layerMask</span> es un filtro que especifica qué layers pueden ser detectadas por el Raycast. Esto sirve para ignorar objetos irrelevantes</p>

        <pre className="code-container">
          <code className="language-csharp">
{`bool Raycast(Vector3 origin, Vector3 direction, float maxDistance, int layerMask)`}
          </code>
        </pre>

    <p><span className="codetext">layerMask</span> es un entero que representa un mapa de bits donde cada bit activa o desactiva una layer específica para el Raycast</p>
    <p>* Si queremos desactivar alguna capa (N) se puede usar <span className="codetext">~(1 {'<<'} N)</span></p>
        
    <pre className="code-container">
          <code className="language-csharp">
{`Physics.Raycast(origin, direction, maxDistance, ~(1 << 3));
// En este caso Raycast detecta colisiones entodas las capas excepto la layer 3 
`}
          </code>
        </pre>

        <p><b>Obtener Más Información</b></p>
        <p>Para obtener detalles sobre el objeto con el que colisiona el rayo, podemos usar la sobrecarga que incluye un parámetro de salida <span className="codetext">RaycastHit</span></p>
        <pre className="code-container">
          <code className="language-csharp">
{`bool Raycast(Vector3 origin, Vector3 direction, out RaycastHit hitInfo, float maxDistance, int layerMask)`}
          </code>
        </pre>

        <p><span className="codetext">hitInfo</span>: Proporciona información sobre el objeto impactado como:</p>

        <div style={{ marginLeft: '20px' }}>
        <p><b>· hitInfo.point</b> El punto exacto de impacto</p>
        <p><b>· hitInfo.normal</b> La dirección perpendicular en el punto de impacto</p>
        <p><b>· hitInfo.collider</b> El collider del objeto impactado</p>
      </div>
    
      <pre className="code-container">
          <code className="language-csharp">
{`public class Test : MonoBehaviour
{
    void Update()
    {
        RaycastHit hit; // Información del impacto

        // Si el Raycast detecta algo
        if (Physics.Raycast(transform.position, transform.forward, out hit, 10f))
        {
            Debug.Log("Impacto con: " + hit.collider.name);
            Debug.Log("Punto de impacto: " + hit.point);
        }
    }
}`}
          </code>
    </pre>

    <p><b>Visualizar el Raycast</b></p>
    <p>Cuando trabajamos con Raycasts, puede ser difícil visualizar lo que sucede en el espacio del juego. Un método útil es usar <span className="codetext">Debug.DrawRay</span> para dibujar una línea en la escena</p>

    <pre className="code-container">
          <code className="language-csharp">
{`public class Test : MonoBehaviour
{
    public float distance;        // Longitud del rayo (en unidades del mundo)
    public LayerMask mask;        // Especifica qué capas considerar en el Raycast
    private RaycastHit hit;       // Almacena información sobre el objeto con el que choca el rayo

    void Update()
    {
        // Comprobar si el rayo colisiona con algo
        if (Physics.Raycast(transform.position, transform.forward, out hit, distance, mask))
        {
            // Si colisiona con un objeto que tiene el tag "Enemy", lo reporta en consola
            if (hit.collider.tag == "Enemy")
                Debug.Log("Tengo un enemigo delante a " + hit.distance + " de distancia");
        }

        // Dibuja el rayo en el editor para depuración (verde)
        Debug.DrawRay(transform.position, transform.forward * distance, Color.green);
    }
}`}
          </code>
    </pre>

    <img 
        src="/images/raycast color.gif" 
        alt="Raycast con color" 
        className="movement-gif" 
      />


      <p><b>RayCastAll y SphereCast</b></p>
      <p><u>RayCastAll</u></p>
      <p>El método <span className="codetext">RayCastAll</span> permite detectar todos los objetos que un rayo atraviesa a lo largo de su recorrido</p>
      <pre className="code-container">
          <code className="language-csharp">
{`public static RaycastHit[] RaycastAll(Vector3 origin, Vector3 direction, float maxDistance, int layerMask)`}</code>
</pre>
<img 
        src="/images/CastAll.png" 
        alt="Múltiples RayCast" 
        className="movement-gif" 
      />
      <p><u>Ejemplo</u></p>
      <pre className="code-container">
          <code className="language-csharp">
{`public class Test : MonoBehaviour
{
    RaycastHit[] hits;

    void Update()
    {
        // Detecta todos los objetos en la dirección hacia adelante
        hits = Physics.RaycastAll(transform.position, transform.forward, 10f);

        // Itera por cada objeto alcanzado
        foreach (RaycastHit hit in hits)
            Debug.Log(hit.collider.gameObject); // Muestra los objetos alcanzados
    }
}
`}</code>
</pre>

    <p><u>SphereCast</u></p>
    <p>El método <span className="codetext">SphereCast</span> es similar a <span className="codetext">RayCast</span>, pero con un volumen adicional: el rayo actúa como un cilindro con un radio (en lugar de una línea sin grosor) </p>

    <pre className="code-container">
          <code className="language-csharp">
{`public static bool SphereCast(Vector3 origin, float radius, Vector3 direction, out RaycastHit hitInfo, float maxDistance, int layerMask)`}</code>
</pre>
  
    <p>Es útil para simulaciones que requieren un volumen de detección</p>
    <img 
        src="/images/spherecast.jpeg" 
        alt="Ejemplo SphereCast" 
        className="movement-gif" 
      />


    <p><b>OverlapSphere</b></p>
    <p><span className="codetext">OverlapSphere</span> crea una esfera en una posición determinada y devuelve un array de colliders que están dentro del radio especificado. Es muy útil para detectar objetos cercanos o para aplicar efectos en un área</p>

    <pre className="code-container">
          <code className="language-csharp">
{`public static Collider[] OverlapSphere(Vector3 position, float radius, int layerMask)`}</code>
    </pre>

    <div style={{ marginLeft: '20px' }}>
        <p><b>· position</b> Centro de la esfera</p>
        <p><b>· radius</b> Radio de la esfera</p>
        <p><b>· layerMask</b> Filtrar objetos detectados según la layer</p>
      </div>

      <img 
        src="/images/overlapsphere.png" 
        alt="Ejemplo OverlapSphere" 
        className="vertical-gif" 
      />

      <p><u>Ejemplo</u></p>
            <pre className="code-container">
                <code className="language-csharp">
      {`public class Test : MonoBehaviour
{
    public float radius; // Radio del área esférica
    public LayerMask enemyMask; // Layers de los objetos a detectar
    public int damage; // Daño a aplicar a los objetos detectados

    public void Boom()
    {
        // Crea un área esférica y obtiene los colliders dentro del radio
        Collider[] objs = Physics.OverlapSphere(transform.position, radius, enemyMask);

        // Aplica daño a cada objeto detectado que tenga un componente Health
        foreach (Collider c in objs)
        {
            c.GetComponent<Health>()?.TakeDamage(damage);
        }
    }
}`}</code>
      </pre>

  <p><u>Casos de uso</u></p>
  <div style={{ marginLeft: '20px' }}>
        <p><b>· </b>Explosiones (aplicar daño en un área)</p>
        <p><b>· </b>Detectar enemigos cercanos</p>
        <p><b>· </b>Comprobar si el jugador está en un rango determinado</p>
      </div>

    
    <p><b>Usos con el Mouse</b></p>
    <p>Los métodos <span className="codetext">OnMouseDown</span> y <span className="codetext">OnMouseUp</span> son eventos para detectar interacciones con el mouse sobre un objeto</p>

    <div style={{ marginLeft: '20px' }}>
        <p><b>· OnMouseDown</b> Se llama cuando el usuario hace clic con cualquier botón del mouse sobre el objeto que tiene un Collider</p>
        <p><b>· OnMouseUp</b> Se llama cuando el usuario suelta el botón del mouse sobre un objeto</p>
      </div>
    

    <pre className="code-container">
                <code className="language-csharp">
      {`public class Test : MonoBehaviour
{
    private bool growing; // Controla si el objeto está creciendo

    // Se activa cuando se presiona el botón del mouse sobre el objeto
    void OnMouseDown()
    {
        growing = true; // Comienza a crecer
    }

    // Se activa cuando se suelta el botón del mouse sobre el objeto
    void OnMouseUp()
    {
        growing = false; // Detiene el crecimiento
    }

    // Actualiza el tamaño del objeto en cada frame mientras crece
    void Update()
    {
        // Incrementa el tamaño si está creciendo, de lo contrario, no hace nada
        transform.localScale += growing ? Vector3.one * Time.deltaTime : Vector3.zero;
    }
}`}</code>
    </pre>
    
      <img 
        src="/images/grow.gif" 
        alt="Ejemplo OverlapSphere" 
        className="movement-gif" 
      />

<p><u>Casos de uso</u></p>
  <div style={{ marginLeft: '20px' }}>
        <p><b>· </b>Activar interacciones cuando se hace clic en un objeto</p>
        <p><b>· </b>Implementar acciones como botones, coleccionables o ajustes dinámico de objetos</p>
        <p><b>· </b>Sistemas simples de arrastrar y soltar objetos</p>
  </div>


  <p><b>Uso de Random</b></p>
  <p>Unity proporciona herramientas en la clase <span className="codetext">Random</span> para generar valores aleatorios</p>

  <p><b>·</b> Generar un número aleatorio entre 0 y 1</p>
  <pre className="code-container">
          <code className="language-csharp">
{`float randomValue = Random.value;`}</code>
    </pre>

  <p><b>·</b> Generar un número aleatorio entre dos valores (ambos inclusive)</p>
  <pre className="code-container">
          <code className="language-csharp">
{`float randomFloat = Random.Range(1.5f, 4.5f);`}</code>
    </pre>


  <p><b>·</b> Generar un número entero aleatorio entre dos valores (ambos inclusive)</p>
  <pre className="code-container">
          <code className="language-csharp">
{`int randomInt = Random.Range(1, 10);`}</code>
    </pre>

  <p><b>·</b> Generar un punto aleatorio dentro de un círculo (2D)</p>
  <pre className="code-container">
          <code className="language-csharp">
{`Vector2 randomPoint = Random.insideUnitCircle;`}</code>
    </pre>

  
  <p><u>Ejemplo</u></p>
      <pre className="code-container">
          <code className="language-csharp">
{`public class RandomPosition : MonoBehaviour
{
    void Start()
    {
        // Generar una posición aleatoria
        Vector2 pos = Random.insideUnitCircle * Random.Range(2f, 5f);
        transform.position = new Vector3(pos.x, Random.value * 3, pos.y);
    }
}`}</code>
</pre>

    <div style={{ marginLeft: '20px' }}>
          <p><b>· Random.insideUnitCircle</b> Genera un punto en un círculo</p>
          <p><b>· Random.Range(2f, 5f)</b> Escala el radio del círculo entre 2 y 5 unidades</p>
          <p><b>· Random.value * 3 </b> Genera una altura aleatoria en el rango de 0 a 3</p>
    </div>

  
    <p><b>Uso de Invoke</b></p>
    <p>Unity proporciona el método <span className="codetext">Invoke</span> para programar la ejecución de métodos tras cierto tiempo o de manera repetida</p>

    <p><b>·</b> Ejecutar un método después de un tiempo</p>
  <pre className="code-container">
          <code className="language-csharp">
{`public void Invoke(string methodName, float time);`}</code>
    </pre>

    <p><b>·</b> Ejecutar un método repetidamente</p>
  <pre className="code-container">
          <code className="language-csharp">
{`public void InvokeRepeating(string methodName, float time, float repeatRate);`}</code>
    </pre>

    <p><b>·</b> Cancelar un método programado</p>
  <pre className="code-container">
          <code className="language-csharp">
{`public void CancelInvoke(string methodName);`}</code>
    </pre>


    <p><u>Ejemplo</u></p>
      <pre className="code-container">
          <code className="language-csharp">
{`using UnityEngine;

public class Test : MonoBehaviour
{
    void Start()
    {
        // Llama al método "IncreaseScale" después de 3 segundos (delay inicial) y lo repite cada segundo
        InvokeRepeating("IncreaseScale", 3f, 1f);
    }

    // Método privado que aumenta la escala del objeto
    private void IncreaseScale()
    {
        // Aumenta la escala del objeto en 1 unidad en cada eje (x, y, z)
        transform.localScale += Vector3.one;
    }
}`}</code>
</pre>

    <img 
            src="/images/grow_invoke.gif" 
            alt="Ejemplo del Invoke" 
            className="movement-gif" 
          />



    <p><b>Buscar objetos</b></p>
    <p>Unity ofrece diversas maneras de encontrar objetos en una escena mediante clases y métodos integrados</p>

    <p><b>·</b> Usar <span className="codetext">gameObject.Find</span> para localizar un objeto en la jerarquía por su <b>nombre</b> exacto</p>
  <pre className="code-container">
          <code className="language-csharp">
{`GameObject player = GameObject.Find("Player");`}</code>
    </pre>

    <p><b>·</b> Usar <span className="codetext">FindObjectOfType{'<'}T{'>'}</span> para localizar un objeto que tenga un <b>componente específico</b> (tipo T)</p>
  <pre className="code-container">
          <code className="language-csharp">
{`GameObject player = FindObjectOfType<PlayerController>().gameObject;`}</code>
    </pre>


    <p><b>·</b> Usar <span className="codetext">GameObject.FindGameObjectWithTag</span> para buscar un objeto que tenga un <b>tag</b> específico</p>
  <pre className="code-container">
          <code className="language-csharp">
{`GameObject player = GameObject.FindGameObjectWithTag("Player");`}</code>
    </pre>


    <p><b>·</b> Buscar <b>todos</b> los objetos con un componente o tag</p>
  <pre className="code-container">
          <code className="language-csharp">
{` // Por componente
PlayerController[] players = FindObjectsOfType<PlayerController>();

 // Por tag
GameObject[] enemies = GameObject.FindGameObjectsWithTag("Enemy");
`}</code>
    </pre>


    <p>Los métodos como <span className="codetext">Find</span>, <span className="codetext">FindObjectOfType</span> y <span className="codetext">FindGameObjectsWithTag</span> pueden ser costosos en tiempo de ejecución si hay muchos objetos. Es preferible evitar usarlos en métodos que se ejecutan frecuentemente, como <span className="codetext">Update</span></p>



    <p className="intro-text">Ejemplo práctico</p>

    <img 
        src="/images/ejemplo_collider.png" 
        alt="Escena con ejemplo" 
        className="movement-gif" 
      />


    <p>En esta escena se debe hacer el típico juego de Tower Defense, donde debe cumplirse:</p>


    <p>1) En los <b>punto de spawn</b> se crean orcos cada cierto tiempo fijo</p>
    <p>2) Los orcos se desplazan hacia su frente y siguen el <b>camino hacia la herrería</b></p>
    <p>3) Si un orco impacta contra la herrería <b>destruye la herrería</b></p>
    <p>4) Al <b>hacer clic</b> en una base de torreta se construye un cañón</p>
    <p>5) El cañón apunta y dispara a los enemigos en su <b>área de alcance</b></p>
    <p>6) El enemigo al que dispara es siempre el <b>último que entró</b> en su área de alcance</p>
    <p>7) Los orcos tienen un <b>sistema de salud</b> de modo que deben recibir un número de impactos antes de ser destruidos</p>

    
    <p><b>Solución: Vamos por partes</b></p>

    <p>Los spawners son dos objetos vacíos puestos en el mapa con el script: <span className="codetext">spawner</span></p>
    <img 
        src="/images/spawners.png" 
        alt="Spawners" 
        className="movement-gif" 
      />

    <p>Para el movimiento de los orcos, simplemente haremos que caminen hacia delante. Mediante dos objetos vacíos con colliders y el componente Raycast hacemos que giren guiándolos hacia la herrería.</p>
    <p>Por último, si el collider del orco choca con la herrería la destruye. Todo esto está en el código <span className="codetext">Orcos</span></p>
    <img 
        src="/images/orco_ejemplo.gif" 
        alt="Orcos moviéndose" 
        className="movement-gif" 
      />

    <p>Para añadir los cañones, se ponen colliders en las bases y con la opción <span className="codetext">OnMouseDown()</span> se añade el prefab, como se puede ver en <span className="codetext">Base</span></p>
    
    <p>Los cañones tienen un Collider para poder saber que orcos tienen cerca, todo el código se encuentra en <span className="codetext">canion</span></p>
    <img 
        src="/images/collider_canion.png" 
        alt="Cañón con collider" 
        className="movement-gif" 
      />

    <p>Por último, para el sistema de salud se hace el script <span className="codetext">Health</span> donde se restan los puntos de vida hasta llegar a 0 y destruir el objeto. Este método luego es llamado en la <span className="codetext">bala</span> cada vez que se golpea a un enemigo</p>


    <div className="code-container2">
      <div className="code-header">
        {/* Selector de pestañas */}
        <button
          className={`tab-button ${activeCode === 'codigo1' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo1')}
        >
          spawner
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo2' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo2')}
        >
          orcos
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo3' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo3')}
        >
          base
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo4' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo4')}
        >
          canion
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo5' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo5')}
        >
          health
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo6' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo6')}
        >
          bala
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
        {activeCode === 'codigo3' && (
          <pre className="code-content">
          <code className="language-csharp">{code3}</code>
        </pre>
        )}
        {activeCode === 'codigo4' && (
          <pre className="code-content">
          <code className="language-csharp">{code4}</code>
        </pre>
        )}
        {activeCode === 'codigo5' && (
          <pre className="code-content">
          <code className="language-csharp">{code5}</code>
        </pre>
        )}
        {activeCode === 'codigo6' && (
          <pre className="code-content">
          <code className="language-csharp">{code6}</code>
        </pre>
        )}
      </div>


      <br></br>
      <img 
        src="/images/orco_final.gif" 
        alt="Escena con solución" 
        className="movement-gif" 
      />

      </div>

      

    </>
  );
}