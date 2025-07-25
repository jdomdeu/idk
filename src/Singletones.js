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
        Singleton y clases internas
      </motion.h1>
      <p className="intro-text">Transición de Escenas</p>
      <p>En Unity, los juegos suelen estar compuestos por varias escenas (menú principal, nivel de juego, pantalla de victoria,...). Para cambiar de una escena a otra, usamos el <b>SceneManager</b></p>
      <pre className="code-container">
          <code className="language-csharp">
            {`// Importamos la librería
using UnityEngine.SceneManagement;

// Cambiar a la escena "Level 1" al pulsar espacio
public class Test : MonoBehaviour
{
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            SceneManager.LoadScene("Level 1");  // Cargar escena
        }
    }
}`}
          </code>
        </pre>
    
    <p>Recuerda añadir las escenas en <b>File --{'>'} Build Settings</b></p>
    <p>La escena en la posición 0 será primera en cargarse al iniciar el juego</p>
    <br></br>
    <p><b>Métodos para cambiar escenas</b></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`// Cargar una escena específica por su nombre
SceneManager.LoadScene("Level 1");

// Cargar una escena por su índice en "Build Settings"
SceneManager.LoadScene(0); // Carga la primera escena en la lista de Build Settings

// Recargar la escena actual
SceneManager.LoadScene(SceneManager.GetActiveScene().name);

// Cargar la siguiente escena en la lista
SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);

// Cargar una escena de forma aditiva (sin borrar la anterior)
SceneManager.LoadScene("gameScene", LoadSceneMode.Additive);
// Útil para cargar contenido adicional, como un menú de pausa sin borrar la escena actual`}
          </code>
        </pre>

  <p>A veces, queremos que algo ocurra automáticamente al cargar una nueva escena. Para eso, usamos el evento <span className="codetext">SceneManager.sceneLoaded</span></p>
  
  <pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;
using UnityEngine.SceneManagement;

public class Test : MonoBehaviour
{
    void OnEnable()
    {
        SceneManager.sceneLoaded += OnSceneLoaded;
    }

    void OnDisable()
    {
        SceneManager.sceneLoaded -= OnSceneLoaded;
    }

    private void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        Debug.Log("Se ha cargado la escena: " + scene.name);
        // Acciones a realizar al cargar una nueva escena
    }
}
`}
          </code>
        </pre>

        <p className="intro-text">Persistencia y Singleton</p>
    <p>En algunos juegos, hay objetos que deben <b>persistir entre escenas</b>, como el GameObject, la música de fondo o las variables de progreso. Para lograr esto se usan dos técnicas:</p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>· DontDestroyOnLoad()</b>: Evita que un objeto se destruya al cambiar de escena</p>
        <p><b>· Patrón Singleton</b>: Asegura que solo haya una única instancia de un objeto en la escena</p>
      </div>
    
    <br></br>
    <p><b>DontDestroyOnLoad()</b></p>
    <p>Este método se usa en objetos que deben sobrevivir entre escenas</p>
    <pre className="code-container">
          <code className="language-csharp">
            {`void Awake()
{
    DontDestroyOnLoad(gameObject); // No se destruye al cambiar de escena
}`}
          </code>
        </pre>
  
  <p>Si esto se usa en un objeto con <b>AudioSource</b>, la música seguirá sonando al cambiar de nivel</p>
  
  <br></br>
  <p><b>Implementando un Singeton en Unity</b></p>
  <p>El <b>Singleton</b> es un patrón de diseño que <b>evita duplicados</b> y garantiza que solo exista una instancia del objeto</p>

  <pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager instance = null; // Instancia única del Singleton

    void Awake()
    {
        if (instance == null) // Si no existe una instancia, se asigna esta
        {
            instance = this;
            DontDestroyOnLoad(gameObject); // No se destruye al cambiar de escena
        }
        else if (instance != this) // Si ya existe una, destruye la nueva
        {
            Destroy(gameObject);
        }
    }
}
`}
          </code>
        </pre>
      

      <p><b>✅ Usarlos en:</b></p>
      <div style={{ marginLeft: '20px' }}>
        <p>GameManager</p>
        <p>Sistema de Audio (música persistente)</p>
        <p>Contoladores de Guardado</p>
      </div>
      <p><b>❌ Evitarlo en:</b></p>
      <div style={{ marginLeft: '20px' }}>
        <p>Objetos de lógica temporal (enemigos, balas, efectos,...)</p>
      </div>
      <br></br>

      <p className="intro-text">Clases Internas</p>
      <p>Las <b>clases internas</b> permiten <b>organizar datos</b> de manera estructurada dentro de otra clase principal. Se usan para encapsular información relacionada con el objeto principal, manteniendo el código más ordenado</p>
      
      <p>El <b>Singleton</b> es un patrón de diseño que <b>evita duplicados</b> y garantiza que solo exista una instancia del objeto</p>

  <pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

public class Test : MonoBehaviour
{
    public List<HudInfo> hudInfoList; // Lista de información del HUD

    [System.Serializable] // Permite que la clase sea visible en el Inspector
    public class HudInfo
    {
        public Image playerImage;      // Imagen del jugador
        public Text playerName;        // Nombre del jugador
        public Image playerHealthBar;  // Barra de vida del jugador
        public Text playerPoints;      // Puntos del jugador

        // Método para configurar los datos del HUD
        public void InitialConfig(Sprite playerSprite, string playerName)
        {
            this.playerImage.sprite = playerSprite;  // Asigna la imagen
            this.playerName.text = playerName;       // Asigna el nombre
            playerHealthBar.fillAmount = 1f;         // Llena la barra de vida
            playerPoints.text = "0";                 // Inicializa los puntos en 0
        }
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/claseInterna.png" 
        alt="Inspector con la Clase Interna" 
        className="vertical-gif" 
      />
    <br></br>

    <p className="intro-text">Métodos de Extensión</p>
    <p>Los métodos de extensión permiten añadir <b>nuevas funcionalidades</b> a clases existentes sin modificar su código original. Son útiles cuando queremos <b>simplificar acciones repetitivas</b>,como modificar el alfa de una imagen</p>
    
    <p><u>Problema a Resolver</u></p>
    <p>Queremos cambiar la transparencia (alfa) de una imagen en Unity. Si intentamos modificar <span className="codetext">img.color.a</span> directamente, obtenemos un <b>error</b>, ya que <span className="codetext">color.a</span> es de solo lectura</p>

    <pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;
using UnityEngine.UI;

public class Test : MonoBehaviour
{
    public Image img;
    void Start()
    {
        img.color.a = 0.5f; // ❌ ERROR: No se puede modificar directamente
    }
}`}
          </code>
        </pre>
  
  <p><u>Solución sin Métodos de Extensión</u></p>
  <p>La forma correcta de modificar el alfa de una imagen sería:</p>
  <pre className="code-container">
          <code className="language-csharp">
            {`Color c = img.color;
c.a = 0.5f;
img.color = c;`}
          </code>
        </pre>
  <p>Pero esta forma es <b>poco práctica</b> si necesitamos hacer esto muchas veces en nuestro código</p>

<br></br>
  <p><u>Solución con Métodos de Extensión</u></p>
  <p>Podemos definir un <b>método de extensión</b> para simplificar el cambio de alfa</p>
  <pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;
using UnityEngine.UI;

public static class ExtendedMethods
{
    public static void SetAlpha(this Image img, float newAlpha)
    {
        Color c = img.color; // Obtener el color actual
        c.a = newAlpha;      // Modificar solo el canal alfa
        img.color = c;       // Aplicar el nuevo color
    }
}
`}
          </code>
        </pre>

  <p>Debe ser una <b>clase estática</b> (no hereda Monobehaviour), porque los métodos de extensión no requieren instancias</p>
  <p>El método es estático <span className="codetext">public static void SetAlpha</span>, para que pueda usarse sin necesidad de crear una instancia</p>
  <p>Se le pasa como primer argumento la <b>clase a extender</b> y los siguientes parámetros son los que recibirá el método como tal</p>

<br></br>
  <p><u>Uso del Método de Extensión</u></p>
  <p>Ahora, en cualquier script podemos llamar a <span className="codetext">SetAlpha()</span> de forma mucho más sencilla</p>
  <pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;
using UnityEngine.UI;

public class Test : MonoBehaviour
{
    public Image img;
    
    void Start()
    {
        img.SetAlpha(0.5f); // ✅ Modifica el alfa sin necesidad de líneas extras
    }
}`}
          </code>
        </pre>
  
<br></br>
  <p className="intro-text">Ejercicio Práctico</p>
  <p>Toca un poco de césped</p>
  <img 
        src="/images/grass.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />






      

      </div>

      

    </>
  );
}