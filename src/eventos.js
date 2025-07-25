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

  const code1 = ``;

  const code2 = ``;
  
  const code3 = ``;


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
        Animacion y Eventos
      </motion.h1>
      
    <p className="intro-text">Introducción al Sistema de Animaciones</p>
    <p>El sistema de animaciones de Unity permite dar vida a objetos y personajes mediante movimientos, cambios de propiedades y efectos visuales. Antes de interactuar con animaciones a través de código, es importante comprender los elementos fundamentales que forman parte del sistema</p>
      
    <p><b>¿Qué es un .anim?</b></p>

    <p>Un archivo <span className="codetext">.anim</span> es una animación en Unity. Representa una secuencia de cambios en propiedades como:</p>
    <div style={{ marginLeft: '20px' }}>
        <p>· Transformaciones (posición, rotación, escala) </p>
        <p>· Modificación de materiales (color, transparencia)</p>
        <p>· Parámetros de cualquier componente en un objeto</p>     
      </div>

    <p>Estas animaciones pueden ser creadas en el <b>Animation Window</b>, donde se pueden grabar cambios de propiedades a lo largo del tiempo o importarlas desde herramientas externas como Blender</p>
    <img 
        src="/images/animation.gif" 
        alt="Ejemplo ventana Animation" 
        className="movement-gif" 
      />
    <p>Una vez creado, se puede arrastrar al <b>Animation Controller</b></p>

      <p><b>¿Qué es un Animator Controller?</b></p>
      <p>Es el sistema que organiza y gestiona las animaciones asociadas a un objeto. Es como un diagrama de flujo donde defines cómo y cuándo las animaciones deben reproducirse</p>
      <img 
        src="/images/animator.png" 
        alt="Ventana del Animator" 
        className="movement-gif" 
      />

    <p><u>Estados</u></p>
    <p>Cada estado representa una animación o comportamiento (Idle, Run, attack2). Los estados son los bloques principales que organizan las animaciones dentro del <b>Animator</b></p>
    <p><u>Transiciones</u></p>
    <p>Las transiciones son conexiones entre estados. Definen las reglas que permiten pasar de una animación a otra, basadas en condiciones como:</p>
    <div style={{ marginLeft: '20px' }}>
        <p>· Un parámetro <span className="codetext">bool</span> que indica si un personaje está corriendo (Run)</p>
        <p>· Un <span className="codetext">Trigger</span> que activa una animación puntual como atacar (attack2)</p>   
    </div>
    <p><u>Parámetros</u></p>
    <p>Los parámetros son variables que se usan para controlar las transiciones. Pueden ser:</p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>· Booleanos (bool)</b>: Verdadero o falso</p>
        <p><b>· Enteros (int)</b>: Para seleccionar animaciones según un valor</p>
        <p><b>· Flotantes (float)</b>: Útil para animaciones dependientes de velocidad</p>
        <p><b>· Disparadors (Trigger)</b>: Activan una transición puntual sin necesidad de desactivarla manualmente</p>
    </div>


    <p><b>Estados especiales</b></p>
    <p>El Animator Controller incluye algunos estados especiales que controlan el flujo global de las animaciones</p>
    <p><b><font color="green">Entry</font></b></p>
    <p>Es el punto de inicio del Animator. Cuando el objeto se activa, la animación definida como el estado por defecto se ejecuta automáticamente <font color="orange">(nodo naranja)</font></p>

    <p><b><font color="lightblue">Any state</font></b></p>
    <p>Este estado actúa como un acceso directo global. Permite cambiar a otro estado sin importar en qué animación esté el objeto en ese momento. Es útil para eventos inmediatos, como un ataque o recibir daño</p>

    <p><b><font color="red">Exit</font></b></p>
    <p>El estado Exit marca la salida del Animator Controller. Es útil cuando deseas que un objeto deje de reproducir animaciones, como desactivarlo</p>

    <img 
        src="/images/animation2.gif" 
        alt="Ventana del Animator" 
        className="movement-gif" 
      />

    <p><b>Opciones de las Animaciones</b></p>
    <p>Unity ofrece varias configuraciones para ajustar el comportamiento de las animaciones en el Animator:</p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>· Velocidad</b>: Controla qué tan rápido se reproduce una animación. Puedes modificarla en el Inspector o mediante código</p>
        <p><b>· Bucle (Loop)</b>: Permite que una animación se repita indefinidamente. Esto se configura en las propiedades de la animación</p>
        <p><b>· Eventos</b>: Se pueden añadir eventos a una animación para ejecutar un código específico (se verá más adelante)</p>
    </div>

    <img 
        src="/images/speed.png" 
        alt="Velocidad en Inspector" 
        className="vertical-gif" 
      />
      <img 
        src="/images/loop.png" 
        alt="Loop en el Inspector" 
        className="vertical-gif" 
      />

      <p><b>Vincular un Animator al Código</b></p>
      <p>Para interactuar con el <b>Animator</b> desde el script, primero se debe declarar una variable del tipo <span className="codetext">Animator</span> y lo asignamos en el Inspector o mediante <span className="codetext">GetComponent</span> </p>
      
      <pre className="code-container">
          <code className="language-csharp">
            {`public Animator anim;

void Start()
{
    // Activamos un parámetro llamado "Run" en el Animator
    anim.SetBool("Run", true);
}`}
          </code>
        </pre>
<br></br>
      <img 
        src="/images/animatorInspector.png" 
        alt="Ventana del Animator" 
        className="movement-gif" 
      />

      <p><b>Actualizar los Parámetros del Animator</b></p>
      <p>Unity permite comunicar al Animator cambios en los parámetros definidos en su controlador. Estos cambios se realizan mediante las siguientes funciones:</p>

      <pre className="code-container">
          <code className="language-csharp">
            {`anim.SetInteger(string name, int value);
// Actualiza un parámetro entero del Animator

anim.SetFloat(string name, float value);
// Modifica un parámetro flotante, útil para animaciones que dependen de valores graduales (velocidad)

anim.SetBool(string name, bool value);
// Activa o desactiva un parámetro booleano

anim.SetTrigger(string name);
// Activa un Trigger que se reinicia automáticamente una vez utilizado`}
          </code>
        </pre>


    <p><b>Agregar Parámetros</b></p>
    <p>Para agregar parámetros que pueden ser usados en el código, hay que ir a la pestaña <b>Parameters</b> del Animator y añadir lo que necesitemos</p>
    <img 
        src="/images/parametros.png" 
        alt="Ventana de Parámetros" 
        className="vertical-gif" 
      />
      
    <p><b>Operaciones útiles</b></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`bool GetBool(string name) // Consultar el valor de un parámetro booleano

int GetInteger(string name) // Consultar el valor de un parámetro entero

float GetFloat(string name) // Consultar el valor de un parámetro real

void Play(string stateName) // Fuerza a reproducir un estado de animación

float speed {get; set;} // Velocidad de reproducción del animator`}
          </code>
        </pre>

        <p className="intro-text">Eventos de animación</p>
    <p>Los eventos de animación son una poderosa herramienta para sincronizar el código con momentos específicos de una animación. Esto permite ejecutar métodos en puntos concretos del ciclo de una animación, logrando interacciones dinámicas</p>
    
    <p><b>Funcionamiento</b></p>
    <div style={{ marginLeft: '20px' }}>
        <p>Es un marcador que pueden añadir en un <b>Animation Clip</b></p>
        <p>Cuando el marcador se alcanza durante la reproducción de la animación, se ejecuta un método público de un script del objeto que tiene el Animator</p>
    </div>

    <img 
        src="/images/event.gif" 
        alt="Ejemplo de usar Eventos" 
        className="movement-gif" 
      />

    <p>El método llamado por el evento debe ser <b>público</b> y estar asociado al <b>GameObject</b> que reproduce la animación</p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public void OnAttack()
{
    Debug.Log("¡Ataque ejecutado!");
}`}
          </code>
        </pre>

      <img 
        src="/images/ataque.gif" 
        alt="Ejemplo del código" 
        className="movement-gif" 
      />

    <p><b>Usos comunes</b></p>
    <div style={{ marginLeft: '20px' }}>
        <p>· Reproducir sonidos sincronizados</p>
        <p>· Instanciar objetos</p>
        <p>· Habilitar o deshabilitar componentes</p>
        <p>· Enviar notificaciones al juego</p>
    </div>


    <p><b>Ventajas de Contolar desde Código</b></p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>· Interactividad</b>: Las animaciones pueden reaccionar a eventos en tiempo real (pulsar teclas o colisiones)</p>
        <p><b>· Control Preciso</b>: Se pueden combinar múltiples parámetros para transiciones complejas</p>
        <p><b>· Reutilización</b>: Permite cambiar animaciones dinámicamente sin modificar el Animator manualmente</p>
    </div>
    <br></br>

      
    <p className="intro-text">Audio Source</p>
    <p>El <b>Audio Source</b> es un componente esencial en Unity que permite reproducir sonidos en tu juego. Este componente se utiliza para asociar clips de audio a GameObjects y controlarlos mediante scripts</p>

    <p><b>Cómo usar Audio Source</b></p>
    <p>1. Añadir un Audio Source a un GameObject</p>
    <div style={{ marginLeft: '20px' }}>
        <p>· Seleccionar el <b>GameObject</b> en la escena</p>
        <p>· Ir al menú de <b>Componentes</b> {'>'} <b>Audio</b> {'>'} <b>Audio Source</b></p>
        <p>· Asociar un <b>Audio Clip</b> desde el inspector para que se reproduzca</p>
    </div>

    <img 
        src="/images/audiosource.gif" 
        alt="Audio Source" 
        className="movement-gif" 
      />
      <p>2. Se puede acceder al Audio Source mediante scripts</p>

      <p><b>Ejemplos Básicos</b></p>

      <pre className="code-container">
        <code className="language-csharp">
                {`// Acceder al AudioSource del objeto y almacenarlo en una variable
AudioSource playerAudio = GetComponent<AudioSource>()

// Crear una variable pública y arrastrarla al Inspector
public AudioSource playerAudio;

// Si el objeto reproduce varios sonidos, crear una variable para cada uno
public AudioSource shootAudio, runAudio, jumpAudio;
`}
      </code>
    </pre>

    <p><b>Operaciones sobre Audio Source</b></p>
    <p>El componente <b>Audio Source</b> de Unity ofrece una variedad de métodos y propiedades para controlar la reproducción de clips de audio en tiempo real. A continuación, se presentan las operaciones más importantes:</p>

    <pre className="code-container">
        <code className="language-csharp">
                {`// Reproducir el clip del AudioSource
void Play()

// Detener el clip y reiniciarlo
void Stop()

// Detener el clip sin reiniciarlo
void Pause()

// Clip actual a reproducir
AudioClip clip {get; set;}

// Indica si el clip se está reproduciendo en este momento
bool isPlaying()

// Determina si el clip está en loop
bool loop {get; set;}

// Determina el pitch (tono) del AudioSource
float pitch {get; set;}

// Determinta el tiempo (seg) actual de reproducción
float time {get; set;}

// Longitud en segundos del clip
float AudioClip.lenght`
}
      </code>
    </pre>

  <p><b>Ejemplo Práctico</b></p>
  <pre className="code-container">
        <code className="language-csharp">
                {`using UnityEngine;

public class AudioExample : MonoBehaviour
{
    public AudioSource audioSource; // Referencia al AudioSource desde el inspector

    void Start()
    {
        // Asignar un clip desde código
        audioSource.clip = Resources.Load<AudioClip>("MyAudioClip");

        // Reproducir el clip
        audioSource.Play();

        // Configurar propiedades
        audioSource.loop = true; // Reproducción en bucle
        audioSource.pitch = 1.2f; // Aumentar el tono
    }

    void Update()
    {
        // Pausar y reanudar el audio al pulsar la barra espaciadora
        if (Input.GetKeyDown(KeyCode.Space))
        {
            if (audioSource.isPlaying)
                audioSource.Pause();
            else
                audioSource.Play();
        }
    }
}`
}
      </code>
    </pre>
    <p className="intro-text">Audio Mixer</p>
    <p>El <b>Audio Mixer</b> es una herramienta en Unity que permite gestionar y controlar el audio de manera profesional, simulando el funcionamiento de una mesa de mezcla. Esto proporciona un control avanzado sobre los sonidos del juego, como ajustar volumen, aplicar efectos, crear transiciones,...</p>
    <img 
        src="/images/audiomixer.png" 
        alt="Audio Mixer" 
        className="movement-gif" 
      />

    <p>Para abrir la ventana accedemos desde <b>Window</b> {'>'} <b>Audio Mixer</b> (Ctrl + 8)</p>
    <p>En cada componente <b>Audio Source</b> se puede configurar el campo <b>Output</b> para asignarlo a un canal del Audio Mixer, permitiendo que los sonidos reproducidos por ese <b>Audio Source</b> sean procesados por el canal correspondiente</p>
    <img 
        src="/images/audio_output.png" 
        alt="Ejemplo del Output" 
        className="vertical-gif" 
      />

    <p><b>Componentes del Audio Mixer</b></p>
    <p><u>Grupos (Groups)</u></p>
    <p>Son canales que reciben y procesan el audio antes de enviarlo al dispositivo de salida</p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>· Master</b>: Grupo principal al que todos los demás canales se conectan por defecto</p>
        <p>Se pueden crear nuevos grupos para organizar el audio por categorías (música, efectos, diálogos,...)</p>
    </div>
    <img 
        src="/images/groups.png" 
        alt="Grupos en Audio Mixer" 
        className="movement-gif" 
      />

    <p><u>Efectos</u></p>
    <p>Permiten procesar el audio en tiempo real añadiendo filtros</p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>· Reverb</b>: Simula el eco del entorno</p>
        <p><b>· Lowpass Filter</b>: Reduce las frecuenicas altas para simular efectos como "escuchar bajo el agua"</p>
        <p><b>· Compressor</b>: Equilibra el volumen general del audio</p>
    </div>
    <img 
        src="/images/efectos_audio.png" 
        alt="Grupos en Audio Mixer" 
        className="movement-gif" 
      />

    <p><u>Snapshots</u></p>
    <p>Almacenan configuraciones del <b>Mixer</b> para crear transiciones dinámicas entre distintas configuraciones de audio, como ajustes de volumen, efectos y más</p>

    <p><b>Ejemplo de cambiar entre Snapshots</b></p>

    <pre className="code-container">
    <code className="language-csharp">
                {`using UnityEngine;
using UnityEngine.Audio;

public class Test : MonoBehaviour
{
    // Referencias a las Snapshots configuradas en el Audio Mixer
    public AudioMixerSnapshot normalSnapshot, battleSnapshot;

    void Update()
    {
        // Cambiar a la Snapshot "normalSnapshot" con la tecla A
        if (Input.GetKeyDown(KeyCode.A))
            normalSnapshot.TransitionTo(1.5f); // Cambiar en 1.5 segundos

        // Cambiar a la Snapshot "battleSnapshot" con la tecla B
        if (Input.GetKeyDown(KeyCode.B))
            battleSnapshot.TransitionTo(1.5f);
    }
}`}
      </code>
    </pre>
  
  <p>Las <b>Snapshots</b> son útiles en diversos escenarios:</p>
  <div style={{ marginLeft: '20px' }}>
        <p>· Cambiar entre audio de exploración y audio de combate</p>
        <p>· Aplicar efectos de distorsión</p>
        <p>· Simular cambios en el entorno, como pasar de un espacio abierto a uno cerrado (con eco o reverb)</p>
    </div>

  <p><u>Exponer variables</u></p>
  <p>El <b>AudioMixer</b> permite exponer variables para manipularlas desde el script. Esta opción es útil para ajustar niveles de audio, como el volumen, en tiempo real</p>

  <p>Antes de controlar la variable desde código es necesario exponerla, permitiendo que el Audio Mixer sea accesible y manipulable mediante código</p>

  <img 
        src="/images/exponer.jpeg" 
        alt="Editor para Exponer imagen" 
        className="horizontal-gif" 
      />

  <p><b>Ejemplo: Controlar el volumen con slider</b></p>

    <pre className="code-container">
              <code className="language-csharp">
                {`using UnityEngine;
using UnityEngine.Audio;
using UnityEngine.UI;

public class Test : MonoBehaviour
{
    // Referencia al AudioMixer desde el Inspector
    public AudioMixer audioMixer;

    // Slider que controlará el volumen, con valores entre 0.001 y 1
    public Slider volumeSlider;

    void Start()
    {
        // Añadimos un listener para ejecutar SetVolume cada vez que cambie el slider
        volumeSlider.onValueChanged.AddListener(SetVolume);
    }

    // Método para ajustar el volumen
    public void SetVolume(float value)
    {
        // Convertimos el valor lineal del slider a decibelios y lo asignamos al Mixer
        audioMixer.SetFloat("Music Volume", 20 * Mathf.Log10(value));
    }
}`}
              </code>
            </pre>
    
  <br></br>

  <p className="intro-text">Unity Events</p>
    
  <p>Los <b>Unity Events</b> permiten ejecutar acciones específicas cuando ocurre un evento en el juego. Son útiles para manejar la lógica del juego compleja de manera organizada</p>  
  
  <p>Actúan como un sistema de <b>callback</b>, permitiendo que un objeto notifique a otros cuando ocurre un cambio o evento importante</p>
  <div style={{ marginLeft: '20px' }}>
        <p>· Se usan para <b>desacoplar scripts</b></p>
        <p>· Se pueden agregar acciones desde el código o directamente en el Inspector</p>
    </div>

    <p><b>Ejemplo</b></p>

    <pre className="code-container">
              <code className="language-csharp">
                {`using UnityEngine;
using UnityEngine.Events;

public class Test : MonoBehaviour
{
    public int health; // Puntos de vida del objeto
    public UnityEvent onDie; // Evento que se ejecutará al morir

    // Método que aplica daño al personaje
    public void TakeDamage(int damage)
    {
        health -= damage; // Reducir puntos de vida

        if (health <= 0) // Si los puntos de vida llegan a cero
        {
            onDie.Invoke(); // Invocar el evento onDie
        }
    }
}`}
              </code>
            </pre>
  <p>El objeto que tiene el script, tendrá una sección llamada <b>OnDie</b> bajo el componente</p>
    <img 
        src="/images/events.png" 
        alt="Queue" 
        className="vertical-gif" 
      />
  <p>Para agregar una acción se debe pulsar en + y arrastrar un objeto con el método que queremos ejecutar cuando ocurre el evento</p>

  <img 
        src="/images/ondie.png" 
        alt="Queue" 
        className="vertical-gif" 
      />
  
  <p className="intro-text">Component in Parent/Children</p>
  <p>Es muy común que los componentes no estén en el mismo GameObject que contiene el script, sino en sus hijos o padres. En estos casos Unity proporciona los métodos:</p>
  
  <div style={{ marginLeft: '20px' }}>
        <p><span className="codetext">GetComponentInParent</span><b>:</b> Busca un componente específico en el propio objeto o en cualquiera de sus padres</p>
        <p><span className="codetext">GetComponentInChildren</span><b>:</b> Busca un componente específico en el propio objeto o en cualquiera de sus hijos (incluyendo sub-hijos)</p>
  </div>       
    <img 
        src="/images/jerarquia.png" 
        alt="Collision Matrix" 
        className="horizontal-gif" 
      />

    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    private AudioSource audioS;
    private Animator anim;

    void Awake()
    {
        audioS = GetComponentInParent<AudioSource>();
        anim = GetComponentInChildren<Animator>();
    }
}`}
          </code>
        </pre>

  <p><b>Consideraciones</b></p>

  <p>· No usarlos en métodos que se ejecutan frecuentemente, como <span className="codetext">Update</span></p>

  <p>· Si la jerarquía es muy grande, estos métodos recorrerán muchos nodos</p>

  <p>· Si hay varios componentes del mismo tipo en los hijos o padres, esos métodos solo retomarán el primero que encuentren</p>

  

    <p className="intro-text">Ejemplo Práctico</p>
    
    <img 
        src="/images/esqueleto.png" 
        alt="Escena con solución" 
        className="movement-gif" 
      />

    <p>En la siguiente escena debemos hacer los siguientes puntos:</p>
    <p>1) Dos teclas para rotar y dos para moverse</p>
    <p>2) Al desplazarse adelante o atrás se <b>activa la animación</b> de correr</p>
    <p>3) Al pulsar click izquierdo el personaje ataca activando la animación de ataque</p>
    <p>4) Hasta que finalice el ataque el personaje <b>no</b> podrá moverse ni atacar de nuevo</p>
    <p>5) Con cada ataque se reproduce un sonido con <b>pitch variable</b></p>

    <p className="intro-text">Solución: Por Partes</p>

    <p><b>Preparar el Escenario</b></p>
    
    <p>El primer paso consiste en configurar el Animator</p>

    <div style={{ marginLeft: '20px' }}>
        <p><b>·</b> Crear los parámetros <span className="codetext">Run</span> (bool) y <span className="codetext">Attack</span> (Trigger) en el Animator Controller</p>
        <p><b>·</b> Crear un estado con una animación de correr y otro estado con una animación de ataque</p>
        <p><b>·</b> Conectar los estados y usar los parámetros para controlarlos</p>
        <p><b>·</b> Activar el checkbox <b>Has Exit Time</b> en la transición de ataque para evitar interrupciones</p>
    </div>

    <img 
        src="/images/esqueleto_estados.png" 
        alt="Comida girando" 
        className="movement-gif" 
      />

    <p>También es importante añadir el componente <b>AudioSource</b> al Player</p>
   
    <p><b>Movimiento y Rotación</b></p>
    <p>Para poder rotar se usarán las <b>teclas horizontales(A y D)</b>, mientras que para desplazarse hacia adelante o atrás las <b>teclas verticales (W y S)</b>. La animación de correr <b>solo</b> se activa con las teclas verticales</p>

    <pre className="code-container">
          <code className="language-csharp">
            {`h = Input.GetAxisRaw("Horizontal"); // Rotar con A/D
transform.Rotate(Vector3.up * rotationSpeed * h * Time.deltaTime);

v = Input.GetAxisRaw("Vertical"); // Moverse con W/S
transform.Translate(Vector3.forward * moveSpeed * v * Time.deltaTime);

// Cambiar animación de correr
Walking = Input.GetAxisRaw("Vertical") != 0; // Detecta si hay movimiento
anim.SetBool("Run", Walking);
`}
          </code>
        </pre>

        <img 
        src="/images/esqueletomoverse.gif" 
        alt="Ejemplo coger comida" 
        className="movement-gif" 
      />
      <br></br>
    <p><b>Activar el Ataque</b></p>
    <p>Al presionar el <b>click izquierdo</b>, se activa la animación de ataque. Mientras el ataque se ejecuta el personaje <b>no</b> podrá moverse ni atacar de nuevo</p>
    <pre className="code-container">
          <code className="language-csharp">
            {`if (Input.GetMouseButtonDown(0) && canAttack)
{
    anim.SetTrigger("Attack"); // Lanza la animación de ataque
    canAttack = false; // Bloquea futuros ataques
    walk = false; // Desactiva movimiento
}`}
          </code>
        </pre>

  
        <img 
        src="/images/ataque_esqueleto.gif" 
        alt="Ejemplo coger comida" 
        className="movement-gif" 
      />
      <br></br>

    <p><b>Finalizar el Ataque</b></p>

    <p>Usa una función pública <span className="codetext">RestoreAttack</span> para poder llamarla al final de la animación. Esta función se usa como un <b>Event</b> de animación y devuelve el control del personaje</p>

    <pre className="code-container">
          <code className="language-csharp">
            {`public void RestoreAttack()
{
    canAttack = true; // Permite volver a atacar
    walk = true; // Reactiva el movimiento
}`}
          </code>
        </pre>

    <img 
        src="/images/restore_attack.png" 
        alt="Ejemplo coger comida" 
        className="movement-gif" 
      />
      <br></br>

    <p><b>Reproducir el Sonido de Ataque</b></p>

    <p>Cada vez que se ejecuta un ataque, se reproduce un sonido con una tonalidad <b>(pitch)</b> que varía aleatoriamente</p>


    <pre className="code-container">
          <code className="language-csharp">
            {`public void PlayStepSound()
{
    audioS.pitch = Random.Range(0.9f, 1.4f); // Tono aleatorio
    audioS.PlayOneShot(swordSound); // Reproduce el sonido
}`}
          </code>
        </pre>


    <p>Código completo y comentado</p>

    <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private Animator anim;
    public float rotationSpeed;
    public float moveSpeed;
    private float h;
    private float v;

    private bool walk;

    public bool canAttack = true;

    private AudioSource audioS;
    public AudioClip swordSound;


    void Awake()
    {
        // Se empieza obteniendo el Animator y el AudioSource, al principio se puede caminar
        anim = GetComponent<Animator>();
        walk = true;
        audioS = GetComponent<AudioSource>();
    }

    void Update()
    { 
        // Si puedo caminar
        if (walk) {
            h = Input.GetAxisRaw("Horizontal");   // Rotar
            transform.Rotate(Vector3.up * rotationSpeed * h * Time.deltaTime);

            v = Input.GetAxisRaw("Vertical");     // Avanzar o ir hacia atrás
            transform.Translate(Vector3.forward * moveSpeed * v * Time.deltaTime);

            Walking = Input.GetAxisRaw("Vertical") != 0;   // Si me muevo en vertical --> animación
            anim.SetBool("Run", Walking);
        }
        

        if (Input.GetMouseButtonDown(0) && canAttack)   // Al pulsar click izquiero y poder atacar
        {
            anim.SetTrigger("Attack");  // Llamo a la animación y no puedo controlar
            canAttack = false;
            walk = false;
        }
    }

    public void RestoreAttack()  // Al finalizar la animación llamo a esta función
    {
        canAttack = true;
        walk = true;
    }


    public void PlayStepSound()   // Sonido de la espada --> se llama en la animación
    {
        audioS.pitch = Random.Range(0.9f, 1.4f);
        audioS.PlayOneShot(swordSound);
    }
}`}
          </code>
        </pre>
<br></br>
        <img 
        src="/images/movementEsquelet.gif" 
        alt="Ejemplo coger comida" 
        className="movement-gif" 
      />

      </div>

      

    </>
  );
}