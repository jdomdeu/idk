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

  const code1 = `using UnityEngine;
using System.Collections;
using UnityEngine.UI; // Importamos UnityEngine.UI para usar elementos de la interfaz

public class PlayerShooter3D : MonoBehaviour
{
    public int ammo; // Cantidad de munición disponible
    [Range(1, 10)]
    public float shootSpeed = 1; // Velocidad de disparo
    public Text ammoText; // Referencia al objeto de UI que mostrará la munición
    private float _shootTimer; // Temporizador para el disparo

    [Header("Input")]
    public bool useLeftClick; // Si disparamos con clic izquierdo
    public bool useRightClick; // Si disparamos con clic derecho
    public KeyCode shootKey; // Tecla de disparo
    public string shootAxis; // Eje para disparo en mando

    [Header("Bullet")]
    public GameObject bulletPrefab; // Prefab de la bala
    public Transform bulletStart; // Posición desde donde se dispara la bala

    public AudioSource shootAudioSource; // Sonido del disparo

    void Start()
    {
        _shootTimer = 0;
        ammoText.text = "Ammo: " + ammo.ToString(); // Mostramos la munición en pantalla
    }

    void Update()
    {
        _shootTimer -= Time.deltaTime; // Reducimos el tiempo del temporizador
        if (ammo > 0 && _shootTimer <= 0) // Si tenemos balas y el tiempo permite disparar
        {
            // Verificamos si el jugador está disparando
            if (Input.GetKey(shootKey) || 
                (useLeftClick && Input.GetMouseButton(0)) || 
                (useRightClick && Input.GetMouseButton(1)) || 
                (shootAxis != "" && Input.GetAxis(shootAxis) > 0))
            {
                Fire(); // Disparamos
                _shootTimer = 1 / shootSpeed; // Reiniciamos el temporizador de disparo
            }
        }
    }

    // Método que maneja el disparo
    private void Fire()
    {
        Instantiate(bulletPrefab, bulletStart.position, bulletStart.rotation); // Instanciamos la bala

        if (shootAudioSource != null)
        {
            shootAudioSource.pitch = Random.Range(0.8f, 1.1f); // Variamos el tono del sonido
            shootAudioSource.Play(); // Reproducimos el sonido
        }

        UpdateAmmo(-1); // Restamos una bala al disparar
    }

    // Método para actualizar la cantidad de munición
    public void UpdateAmmo(int amount)
    {
        ammo += amount; // Sumamos o restamos munición
        ammoText.text = "Ammo: " + ammo.ToString(); // Actualizamos el texto en la interfaz
    }
}

`;

  const code2 = `using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Item : MonoBehaviour
{
    public ItemType itemType; // Tipo de objeto que representa
    public float amount; // Cantidad de munición o salud que da
    public float time; // Tiempo de duración si es un efecto temporal

    public enum ItemType
    {
        HealthKit, // Kit de salud
        EnergyDrink, // Bebida energética
        Ammo // Munición
    }

    // Detectamos si el jugador toca el objeto
    public void OnTriggerEnter(Collider other)
    {
        if(other.tag == "Player") // Si el objeto que lo toca es el jugador
        {
            switch(itemType)
            {
                case ItemType.HealthKit:
                    other.GetComponent<Health>().AddHealth((int)amount); // Aumentamos salud
                    break;
                case ItemType.EnergyDrink:
                    other.GetComponent<AlteredStates>().ApplyEnergyDrink(amount, time); // Aplicamos efecto temporal
                    break;
                case ItemType.Ammo:
                    other.GetComponent<PlayerShooter3D>().UpdateAmmo((int)amount); // Aumentamos la munición
                    break;
            }
            Destroy(gameObject); // Destruimos el objeto una vez recogido
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
        Implementacion de Interfaz
      </motion.h1>
      
      <p className="intro-text">Conceptos Fundamentales</p>
      <p>En videojuegos, la <b>interfaz</b> es el puente entre el jugador y el juego, mostrando información clave como objetivos, salud o inventario. Las interfaces deben ser <b>intuitivas</b> y <b>responsivas</b>, mejorando la experiencia del usuario</p>
      
      <img 
        src="/images/interface.jpg" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
      <p><b><u>Elementos de UI en Código</u></b></p>
      
      <p>En Unity, los elementos de interfaz (UI) pueden ser referenciados y manipulados desde el código. Esto nos permite cambiar dinámicamente textos, imágenes, barras de progreso y otros componentes durante la ejecución del juego</p>      
      <p>Para trabajar con elementos de UI en código, es necesario importar la librería <span className="codetext">using UnityEngine.UI</span> y declarar las variables públicas  </p>
      
        <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public GameObject panelUI;        // Referencia a un panel de UI
    public Image imageUI;             // Referencia a una imagen de UI
    public TextMeshProUGUI textUI;    // Referencia a un texto de UI
    public Slider sliderUI;           // Referencia a un slider de UI
}`}
          </code>
        </pre>


        <img 
        src="/images/UI_Example.png" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />

    <p className="intro-text">Elementos UI: Image</p>
    
    <p>El componente <b>Image</b> se usa para mostrar una imagen (o sprite) dentro de un <b>Canvas</b>. Es ideal para iconos, fondos, barras de vida, ...</p>
    <p><b><u>Ejemplo</u></b></p>


    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public Image testImage; // Referencia al componente Image

    void Start()
    {
        // Cambia el color de la imagen cada segundo, después de 1 segundo
        InvokeRepeating("RandomColor", 1f, 1f);
    }

    public void ChangeSprite(Sprite newSprite)
    {
        testImage.sprite = newSprite; // Asigna un nuevo sprite
    }

    public void RandomColor()
    {
        testImage.color = Random.ColorHSV(); // Genera un color aleatorio
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/colores.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="vertical-gif" 
      />


  <p className="intro-text">Elementos UI: Image Fill</p>
  <p>EL componente <b>Image</b> en Unity puede configurarse como <b>Filled</b>, lo que permite crear efectos visuales como barras de vida, cargas progresivas o círculos de cooldown</p>
  <img 
        src="/images/ejemploFilled.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
  
  
  <p><b><u>Ejemplo</u></b></p>

  <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public float health;         // Salud actual
    public float maxHealth;      // Salud máxima
    public Image healthImage;    // Referencia a la imagen de tipo Filled
    public Color minColor;       // Color cuando la salud es mínima
    public Color maxColor;       // Color cuando la salud es máxima

    void Start()
    {
        UpdateHealth(-35f);
    }

    // Método para actualizar la salud
    public void UpdateHealth(float amount)
    {
        health += amount; // Ajusta la salud
        health = Mathf.Clamp(health, 0, maxHealth); // Limita la salud entre 0 y maxHealth

        // Actualiza el fillAmount de la imagen (proporción de salud)
        healthImage.fillAmount = health / maxHealth;

        // Interpola el color entre minColor y maxColor según el fillAmount
        healthImage.color = Color.Lerp(minColor, maxColor, healthImage.fillAmount);
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/health.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />


    <p className="intro-text">Elementos UI: Text - Legacy</p>

    <p>Este componente se usa para mostrar texto en <b>Canvas</b>. Es ideal para mostrar puntuaciones, mensajes, instrucciones o cualquier tipo de información textual en la interfaz de usuario</p>
     
    <p><b><u>Ejemplo</u></b></p>

    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public int points;          // Puntos actuales
    public Text pointsText;     // Referencia al componente Text (Legacy)

    public void UpdatePoints(int amount)
    {
        points += amount; // Aumenta o disminuye los puntos
        pointsText.text = points.ToString(); // Actualiza el texto con los nuevos puntos
    }

    public void SetTextColor(Color newColor)
    {
        pointsText.color = newColor; // Asigna un nuevo color al texto
    }
}`}
          </code>
        </pre>
  

  <p className="intro-text">Text Mesh Pro (TMP)</p>
  <p>Es un plugin de Unity que mejora la visualización de textos en la interfaz de usuario. Ofrece una mayor calidad visual, más opciones de personalización y mejor rendimiento en comparación con <b>Text (Legacy)</b></p>

  <p><b><u>Ejemplo</u></b></p>
  <pre className="code-container">
          <code className="language-csharp">
            {`using TMPro; // Asegúrate de incluir esta línea para usar Text Mesh Pro

public class Test : MonoBehaviour
{
    public TextMeshProUGUI improvedText; // Referencia al componente Text Mesh Pro

    void Start()
    {
        improvedText.text = "Hello TMPro"; // Asigna un texto inicial
    }
}`} </code>
        </pre>

        <img 
        src="/images/text.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />

  <p><b>Crear Fuentes</b></p>

  <p>Para usar fuentes personalizadas en <b>Text Mesh Pro</b>, sigue estos pasos:</p>
  <div style={{ marginLeft: '20px' }}>
        <p><b>·</b>Abrir el <b>Font Asset Creator</b>:</p>
        <p style={{ marginLeft: '45px' }}> <b>Window -{'>'} Text Mesh Pro -{'>'} Font Asset Creator</b></p>
        <p><b>·</b> Selecciona un archivo de fuente</p>
        <p style={{ marginLeft: '45px' }}> Usa archivos <b>.ttf</b> o <b>.otf</b> para crear una fuente compatible</p>
        <p><b>·</b> Genera el <b>Font Asset</b></p>
      </div>
      <br></br>
  
  
    <p className="intro-text">Elementos UI: Button</p>
    <p>Los botones son elementos que permiten al usuario interactuar con el juego a través de eventos. Estos se pueden configurar manualmente desde el <b>Canvas</b> o programar eventos en <b>código</b></p>
    <p><b>Funcionalidad por Inspector</b></p>
    <p>Se pueden asignar funcionalidades a un botón desde el Inspector arrastrando un objeto con un script y seleccionando un método público con la opción <span className="codetext">OnClick()</span></p>
    
    <p><b><u>Ejemplo: Generar cubos</u></b></p>

    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public GameObject cubePrefab; // Prefab del cubo
    public Button buttonTest; // Botón de la UI
    public Text textButton; // Texto del botón

    public void SpawnCubes(int amount)
    {
        for (int i = 0; i < amount; i++)
        {
            Instantiate(cubePrefab); // Instancia un cubo
        }
        buttonTest.interactable = false; // Desactiva el botón después de usarlo
        textButton.text = "Deactivated"; // Cambia el texto del botón
    }
}`} </code>
        </pre>

        <img 
        src="/images/button.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
  
  <br></br>

  <p><b>Eventos por código</b></p>
  <p>También es posible asignar eventos a un botón directamente por código usando <span className="codetext">onClick.AddListener()</span></p>

  <p><b><u>Ejemplo: Generar 3 cubos</u></b></p>
  <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public GameObject cubePrefab;
    public Button buttonTest;
    public Text textButton;

    void Awake()
    {
        buttonTest.onClick.AddListener(SpawnThreeCubes); // Asigna el evento al botón
    }

    public void SpawnThreeCubes()
    {
        for (int i = 0; i < 3; i++)
        {
            Instantiate(cubePrefab); // Instancia tres cubos
        }
        buttonTest.interactable = false; // Desactiva el botón
        textButton.text = "Deactivated"; // Cambia el texto del botón
    }
}`} </code>
        </pre>

        <img 
        src="/images/3cubos.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
  
    <p className="intro-text">Elementos UI: Slider</p>
    <p>El componente <b>Slider</b> representa un selector con rango de valores mínimo y máximo. Siendo ideal para ajustes de volumen, brillo, progreso, ... Al igual que los botones se puede configurar manualmente desde el <b>Canvas</b> o programar eventos en <b>código</b></p>

    <p><b>Funcionalidad por Inspector</b></p>
    <p>Se pueden asignar funcionalidades al Slider desde el Inspector arrastrando un objeto con un script y seleccionando un método público con la opción <span className="codetext">OnValueChanged()</span></p>
    <p><b><u>Ejemplo: Controlar transparencia (alpha)</u></b></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public Slider sliderTest;  // Referencia al Slider
    public Image healthImage;  // Referencia a la Image

    // Método para actualizar la transparencia de la imagen
    public void UpdateAlphaImage()
    {
        Color newColor = healthImage.color; // Obtiene el color actual de la imagen
        newColor.a = sliderTest.value;      // Asigna el valor del Slider al canal alpha
        healthImage.color = newColor;       // Aplica el nuevo color a la imagen
    }
}`} </code>
        </pre>

        <img 
        src="/images/sliderEvent.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
      <br></br>

    <p><b>Eventos por código</b></p>
    <p>También es posible asignar eventos a un slider directamente por código usando <span className="codetext">onValueChanged.AddListener()</span></p>
    
    <p><b><u>Ejemplo: Controlar transparencia (alpha)</u></b></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public Slider sliderTest;  // Referencia al Slider
    public Image healthImage;  // Referencia a la Image

    void Awake()
    {
        // Suscribe el método UpdateAlphaImage al evento onValueChanged del Slider
        sliderTest.onValueChanged.AddListener(UpdateAlphaImage);
    }

    // Método que se ejecuta cuando el valor del Slider cambia
    public void UpdateAlphaImage(float value)
    {
        Color newColor = healthImage.color; // Obtiene el color actual de la imagen
        newColor.a = value;                 // Asigna el valor del Slider al canal alpha
        healthImage.color = newColor;       // Aplica el nuevo color a la imagen
    }
}`} </code>
        </pre>
      
      <img 
        src="/images/sliderCode.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />

    <p className="intro-text">Elementos UI: Toggle</p>
    <p>El componente <b>Toggle</b> representa un selector tipo Verdadero/Falso (on/off). Es ideal para opciones de configuración, activar o desactivar funcionalidades,... Este componente también se puede configurar manualmente desde el <b>Canvas</b> o programar eventos en <b>código</b></p>
    <p><b>Funcionalidad por Inspector</b></p>
    <p>Se pueden asignar funcionalidades al Toggle desde el Inspector arrastrando un objeto con un script y seleccionando un método público con la opción <span className="codetext">.isOn</span></p>
    
    <p><b><u>Ejemplo: Activar o desactivar Panel</u></b></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public Toggle toggleTest;  // Referencia al Toggle
    public GameObject panelTest; // Referencia al Panel

    // Método para cambiar el estado del Panel
    public void ChangeState()
    {
        panelTest.SetActive(toggleTest.isOn); // Activa/desactiva el Panel según el estado del Toggle
    }
}`} </code>
        </pre>

        <img 
        src="/images/toggleInspector.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
      <br></br>

    <p><b>Eventos por código</b></p>
    <p>También es posible asignar eventos a un toggle directamente por código usando <span className="codetext">onValueChanged.AddListener()</span></p>
    <p><b><u>Ejemplo: Activar o desactivar Panel</u></b></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public Toggle toggleTest;  // Referencia al Toggle
    public GameObject panelTest; // Referencia al Panel

    void Awake()
    {
        // Suscribe el método ChangeState al evento onValueChanged del Toggle
        toggleTest.onValueChanged.AddListener(ChangeState);
    }

    // Método que se ejecuta cuando el estado del Toggle cambia
    public void ChangeState(bool value)
    {
        panelTest.SetActive(value); // Activa/desactiva el Panel según el valor del Toggle
    }
}`} </code>
        </pre>

        <img 
        src="/images/toggleCode.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
      <br></br>

  <p className="intro-text">Elementos UI: InputField</p>
  <p>Los <b>InputField</b> permiten a los jugadores introducir texto dentro del juego, lo cual es útil para nombres de usuario, contraseñas, mensajes,...</p>
  <p><b><u>Ejemplo: Capturar texto</u></b></p>
  <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public TMP_InputField inputFieldTest; // Campo de entrada de texto
    private string nameTest; // Variable para almacenar el texto
    private AudioSource audioS;

    void Awake()
    {
        audioS = GetComponent<AudioSource>();
        inputFieldTest.onEndEdit.AddListener(UpdateName); // Ejecuta UpdateName al terminar de escribir
    }

    public void PlaySound()
    {
        audioS.Play(); // Reproduce un sonido (por ejemplo, al confirmar el texto)
    }

    public void UpdateName(string value)
    {
        nameTest = value; // Guarda el texto introducido
        Debug.Log("Nombre ingresado: " + nameTest);
    }
}`} </code>
        </pre>

        <img 
        src="/images/InputField.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />


      <br></br>

      <p className="intro-text">Elementos UI: Dropdown</p>
      <p>El <b>dropdown</b> permite a los jugadores seleccionar una opción de una lista predefinida. Es útil para configurar preferencias, seleccionar personajes, elegir niveles,... Este componente también se puede configurar manualmente desde el <b>Canvas</b> o programar eventos en <b>código</b></p>
      
    <p><b>Funcionalidad por Inspector</b></p>
    <p>Se pueden asignar funcionalidades al Dropdown desde el Inspector arrastrando un objeto con un script y seleccionando un método público con la opción <span className="codetext">.value</span></p>
    
    <p><b><u>Ejemplo: Cambiar color</u></b></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public TMP_Dropdown dropdownTest; // Referencia al Dropdown
    public Image imageTest; // Imagen que cambiará de color

    public void ChangeColor()
    {
        if (dropdownTest.value == 0)
            imageTest.color = Color.red;
        else if (dropdownTest.value == 1)
            imageTest.color = Color.blue;
        else
            imageTest.color = Color.green;
    }

    public void PrintOption()
    {
        int index = dropdownTest.value;
        Debug.Log("Opción seleccionada: " + dropdownTest.options[index].text);
    }
}`} </code>
        </pre>

        <img 
        src="/images/DropdownInspector.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
      <br></br>

    <p><b>Eventos por código</b></p>
    <p>También es posible asignar eventos a un dropdown directamente por código usando <span className="codetext">onValueChanged.AddListener()</span></p>
    <p><b><u>Ejemplo: Activar o desactivar Panel</u></b></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public TMP_Dropdown dropdownTest; // Referencia al Dropdown
    public Image imageTest; // Imagen que cambiará de color

    void Awake()
    {
        dropdownTest.onValueChanged.AddListener(ChangeColor);
    }

    public void ChangeColor(int value)
    {
        if (value == 0)
            imageTest.color = Color.red;
        else if (value == 1)
            imageTest.color = Color.blue;
        else
            imageTest.color = Color.green;
    }
}`} </code>
        </pre>

        <img 
        src="/images/dropcode.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
      <br></br>
      
      <p className="intro-text">Elementos UI: Event Trigger</p>
      <p>El <b>Event Trigger</b> permite configurar mútliples eventos sobre un elemento de la interfaz, como clicks, entradas, salidas,... Es ideal para crear interacciones avanzadas en la UI sin necesidad de escribir código adiconal. Este componente también se puede configurar manualmente desde el <b>Canvas</b> o programar eventos en <b>código</b></p>
      

    <p><b>Funcionalidad por Inspector</b></p>
    <p>Se pueden asignar funcionalidades al Event Trigger desde el Inspector arrastrando un objeto con un script y seleccionando un método público con distintas opciones</p>
    
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    public Image imageTest; // Referencia a la Image

    // Método para cambiar el color de la imagen
    public void UpdateImage(bool enter)
    {
        imageTest.color = enter ? Color.red : Color.blue; // Rojo si entra, azul si sale
    }

    // Método para imprimir un mensaje en la consola
    public void PrintMessage()
    {
        Debug.Log("Clicked"); // Mensaje al hacer clic
    }
}`} </code>
        </pre>

        <img 
        src="/images/eventTriggerInspector.png" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="vertical-gif" 
      />

  <p><b>Eventos por código</b></p>
  <p>También es posible asignar eventos a un dropdown directamente por código usando <span className="codetext">IPointerEnterHandler</span>, <span className="codetext">IPointerExitHandler</span> y <span className="codetext">IPointerDownHandler</span></p>

  <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerDownHandler
{
    public Image imageTest; // Referencia a la Image

    // Método que se ejecuta al hacer clic
    public void OnPointerDown(PointerEventData eventData)
    {
        Debug.Log("Clicked"); // Mensaje al hacer clic
    }

    // Método que se ejecuta al entrar el puntero
    public void OnPointerEnter(PointerEventData eventData)
    {
        imageTest.color = Color.red; // Cambia el color a rojo
    }

    // Método que se ejecuta al salir el puntero
    public void OnPointerExit(PointerEventData eventData)
    {
        imageTest.color = Color.blue; // Cambia el color a azul
    }
}`} </code>
        </pre>

        <img 
        src="/images/eventTriggerInspector.gif" 
        alt="Ejemplo de movimiento básico en videojuegos" 
        className="movement-gif" 
      />
    <br></br>
      <a href="https://docs.unity3d.com/2018.3/Documentation/ScriptReference/EventSystems.EventTrigger.html" target="_blank"><b>Documentación oficial de EventTrigger en Unity
      </b></a>
    
    <br></br>


    <p className="intro-text">Ejemplo práctico</p>
    <p>En una escena completa se tiene que implementar el funcionamiento HUD</p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>·</b>La <b>barra de salud</b> representa la salud actual del personaje</p>
        <p><b>·</b>El <b>contador de balas</b> representa la munición actual del personaje</p>
        <p><b>·</b>El <b>contador de muertes</b> indica los zombies que has matado</p>
        <p><b>·</b>El texto <b>GAME OVER</b> se muestra cuando muere el personaje del jugador</p>
      </div>
    
    <img 
        src="/images/ejemplozombies.png" 
        alt="Escena" 
        className="movement-gif" 
      />
    <p className="intro-text">Solución</p>
    <p><b>Barra de Salud</b></p>
    <p>La configuración en el editor se basa en dos <b>Images</b>, una para el fondo de la barra y otra para la barra. Esta última debe ser <b>Filled</b> con el método <b>Horizontal</b> en el Fill Method ajustado a 1 para que empiece lleno</p>
    <img 
        src="/images/barravidaCanvas.gif" 
        alt="Escena con solución" 
        className="movement-gif" 
      />

<pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class Health : MonoBehaviour 
{
    public int maxHealth; // Salud máxima
    public int currentHealth; // Salud actual
    public Image healthBar; // Referencia a la barra de salud (Image Fill)
    public AudioSource hitAudioSource; // Sonido al recibir daño
    public UnityEvent onDie; // Evento que se ejecuta al morir

    void Start()
    {
        UpdateHealthBar(); // Actualiza la barra de salud al inicio
    }

    // Método para actualizar la salud
    public void UpdateHealth(int amount)
    {
        currentHealth += amount; // Aumenta o disminuye la salud
        currentHealth = Mathf.Min(currentHealth, maxHealth); // Limita la salud al máximo
        UpdateHealthBar(); // Actualiza la barra de salud
    }

    // Método para recibir daño
    public void TakeDamage(int amount)
    {
        UpdateHealth(-amount); // Reduce la salud

        // Cambia el material (efecto visual)
        if (GetComponent<MaterialModifier>())
            GetComponent<MaterialModifier>().ChangeMaterial(0.1f);

        // Reproduce el sonido de daño
        if (hitAudioSource != null)
            hitAudioSource.Play();

        // Verifica si el personaje ha muerto
        if (currentHealth <= 0)
            Die();
    }

    // Método para añadir salud
    public void AddHealth(int amount)
    {
        UpdateHealth(amount);
    }

    // Método para recuperar toda la salud
    public void RecoverAllHealth()
    {
        UpdateHealth(maxHealth);
    }

    // Método para obtener el porcentaje de salud
    public float GetPercentageHealth()
    {
        return (float)currentHealth / maxHealth;
    }

    // Método que se ejecuta al morir
    public void Die()
    {
        onDie.Invoke(); // Ejecuta el evento de muerte
    }

    // Método para destruir el objeto
    public void Destroy()
    {
        Destroy(gameObject);
    }

    // Método para actualizar la barra de salud
    public void UpdateHealthBar()
    {
        if (healthBar != null)
        {
            healthBar.fillAmount = GetPercentageHealth(); // Actualiza el fillAmount de la barra
        }
    }
}`} </code>
        </pre>
    
  <p>En el Inspector simplemente necesitaríamos poner la vida máxima, la vida actual (al principio son la misma), el sprite de la barra que se llena y el Audio Source</p>
  
  <br></br>

  <p><b>Contador de balas</b></p>
  <p>Para el contador de balas simplemente se necesita un <b>Text</b> en la esquina de la pantalla, el cual mostrará el número de balas que nos quedan. Sin embargo la lógica de las balas no es simplemente <b>restar cuando se disparan</b>, sino que también deben <b>sumarse al recoger el item</b></p>
  





    <div className="code-container2">
      <div className="code-header">
        {/* Selector de pestañas */}
        <button
          className={`tab-button ${activeCode === 'codigo1' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo1')}
        >
          PlayerShooter
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo2' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo2')}
        >
          Item
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
        src="/images/bullets.gif" 
        alt="Escena con solución" 
        className="movement-gif" 
      />
      <br></br>

      <p><b>Contador de muertes</b></p>
      <p>Al ser un contador es muy parecido al anterior, sin embargo debe llamarse cada vez que se <b>mata a un zombie</b> y se debe crear un objeto para gestionar los puntos. En este caso la interfaz también se hace con un <b>Text</b></p>
      <pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;
using System.Collections;
using UnityEngine.UI; // Importamos la librería para la UI

public class Points : MonoBehaviour
{
    public int points; // Variable que almacena la puntuación actual
    public Text pointsText; // Referencia al objeto de texto en la UI

    void Awake()
    {
        UpdatePointsText(); // Al iniciar, actualizamos la UI con la puntuación inicial
    }

    // Método para actualizar los puntos
    public void UpdatePoints(int amount)
    {
        points += amount; // Sumamos la cantidad de puntos recibida
        UpdatePointsText(); // Actualizamos la UI con la nueva puntuación
    }

    // Método para actualizar el texto en la interfaz
    public void UpdatePointsText()
    {
        if (pointsText != null) // Si el objeto de texto está asignado
            pointsText.text = points.ToString(); // Convertimos los puntos a string y los mostramos en pantalla
    }
}
`} </code>
        </pre>

  <p>Para que el jugador gane puntos al eliminar un zombie, necesitamos asegurarnos de que cada enemigo tenga un script que se encargue de otorgar puntos al morir</p>
  <pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;
using System.Collections;

public class PointsGiver : MonoBehaviour
{
    public int points; // Cantidad de puntos que este objeto otorga al ser destruido

    // Método que se ejecuta cuando el objeto es destruido
    void OnDestroy()
    {
        // Busca un objeto en la escena que tenga el script 'Points'
        Points p = FindObjectOfType<Points>(); 

        // Si existe un sistema de puntos en la escena, suma los puntos
        if (p != null)
            p.UpdatePoints(points);
    }
}`} </code>
        </pre>
        <br></br>
        <img 
        src="/images/disparos.gif" 
        alt="Escena con solución" 
        className="movement-gif" 
      />
  <br></br>
    <p><b>GAME OVER</b></p>
    <p>Por último, para la pantalla de muerte usamos el primer script (Health) porque tiene definido el evento <b>onDie</b>. Sin embargo, debemos tener el texto Game Over <b>oculto</b> desde el principio</p>

    <pre className="code-container">
          <code className="language-csharp">
            {`public UnityEvent onDie; // Evento que se ejecuta al morir

    
    // Método que se ejecuta al morir
    public void Die()
    {
        onDie.Invoke(); // Ejecuta el evento de muerte
    }`} </code>
        </pre>
      <br></br>
        <img 
        src="/images/onDie2.png" 
        alt="Escena con solución" 
        className="movement-gif" 
      />
    <p>De esta forma cuando el player muera se llama a <b>Destroy</b> para que elimine al personaje y se activa el <b>GameObject</b> que muestra el texto de perder</p>

    <img 
        src="/images/gameoverzombie.gif" 
        alt="Escena con solución" 
        className="movement-gif" 
      />
      <br></br>

      </div>

      

    </>
  );
}