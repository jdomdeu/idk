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

  const code1 = ` // Código para el movimiento de los coches con diferentes controles
  
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using static UnityEngine.GraphicsBuffer;

public class CarController : MonoBehaviour
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

}`;

  const code2 = ` //Código para diferenciar comportamiento de balas y comida del suelo

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Food : MonoBehaviour
{
    public bool shooted; // Indica si la comida ha sido disparada o no
    public float moveSpeed; // Velocidad a la que se mueve siendo disparada
    public float rotateSpeed; // Velocidad a la que rota mientras espera ser recogida
    public GameObject hitParticles; // Particulas generadas al impactar

	void Update ()
    {
        if (shooted) // Si ha sido disparada --> diferenciar entre los dos tipos de comida
            transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime); // Moverse al frente
        else // Si NO
            transform.Rotate(Vector3.up * rotateSpeed * Time.deltaTime); // Rotar
    }

    void OnTriggerEnter(Collider other) // Al detectarse una colisión lógica (Ya que la comida tiene collider Trigger)
    {
        if (shooted) // Si ha sido disparada
        {
            if(other.tag == "Player") // Si con lo que choca es un Player (coche)    
                other.GetComponent<Health>().Hit(); // Llama a su método Hit para hacerle un impacto

            if(other.tag != "Food") // Si con lo que choca no es comida (Así evitamos que la comida choque entre sí al ser disparada)
            {
                Instantiate(hitParticles, transform.position, transform.rotation); // Instancia un sistema de partículas en su posición
                Destroy(gameObject); // Destruye el objeto (la bala)
            }
        }
    }

    public void Shoot() // Método para determinar que la comida ha sido disparada
    {
        shooted = true; // La comida pasa a estado disparada
        Destroy(gameObject, 5f); // Destruye la comida a los 5 segundos (por si acaso no choca con nada)
    }
}`;
  
  const code3 = ` // Código para la lógica de recoger y disparar comida
  
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FoodShooter : MonoBehaviour
{
    public Stack<GameObject> foodStack; // Comida almacenada para ser disparada --> la pila es de GameObject para acceder a ellos
    public Transform shootPos; // Punto en el que se posiciona y con el que se orienta la comida que va a ser disparada
    public KeyCode shootKey; // Tecla con la que disparar comida

    void Awake()
    {
        foodStack = new Stack<GameObject>(); // Inicialización de la pila
    }

    void Update()
    {
        if (Input.GetKeyDown(shootKey) && foodStack.Count > 0) // Si pulso la tecla de disparo y hay elementos en la lista de comida
            ShootFood(); // Llamo al método para disparar comida
    }

    void OnTriggerEnter(Collider other) // Al detectar una colisión lógica
    {
        if(other.tag == "Food" && !other.GetComponent<Food>().shooted) // Si con lo que choca tiene el tag comida y esa comida NO está siendo disparada (la del suelo)
        {
            foodStack.Push(other.gameObject); // Añado esa comida a mi lista
            other.gameObject.SetActive(false); // Desactivo el objeto de comida que acabo de recoger
        }
    }

    private void ShootFood() // Método para disparar la comida almacenada
    {
        GameObject food = foodStack.Pop(); // Guardo en 'food' la última comida recogida (extrae el elemento en la cima y lo elimina)
        food.transform.position = shootPos.position; // Pone la comida para ser disparada en la posicion de disparo 
        food.transform.rotation = shootPos.rotation; // Orienta la comida en la misma dirección que la orientación de disparo
        food.GetComponent<Food>().Shoot(); // Pone a ese componente como "shooted" y hace que se mueva
        food.SetActive(true); // Activa el objeto de comida
    }
}`;

  const code4 = `  // Código para la salud de los coches

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Health : MonoBehaviour
{
    public int hits; // Número de golpes para ser destruido

    public void Hit() // Méotodo público para recibir un golpe
    {
        hits--; // Disminuyo en 1 el número de impactos
        if (hits <= 0) // Si los impactos llegan a cero 
            Destroy(gameObject); // Destruyo el objeto
    }
}
`;
  
  const code5 = `  // Código para eliminar las partículas pasado un tiempo
  
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Destroyer : MonoBehaviour
{
    public float time; // Tiempo que debe pasar para ser destruido el objeto

	void Start ()
    {
        Destroy(gameObject, time); // Llama al método destroy con el delay (retraso) que le pasemos
	}
}
`;

  const code6 = `  // Código con la lógica del Spawner
  
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Spawner : MonoBehaviour
{
    public List<GameObject> objsToSpawn; // Lista de prefabs de objetos a instanciar
    public Vector3 offset; // Desplazamiento para determinar el área de instanciación (área donde pueden aparecer)
    public LayerMask obstacleMask; // Layers sobre los que no puede instanciarse un objeto
    public float timeToSpawn; // Cada cuanto tiempo se instancia un item

    void Start()
    {
        InvokeRepeating("Spawn", timeToSpawn, timeToSpawn); // Llamo al método 'Spawn' cada cierto tiempo con Invoke Repeating
    }

    private void Spawn() // Método para spawnear un objeto
    {
        GameObject obj = Instantiate(GetObj(), GetPosition(), Quaternion.identity); // Instancia el objeto (obtenido por el método), en una posición (obtenida por el método), sin rotación
        obj.transform.SetParent(this.transform); // El objeto instanciado se hace hijo del instanciador en la jerarquía --> del objeto vacío "spawner"
    }

    private GameObject GetObj() // Método para obtener un prefab aleatorio de la lista de prefabs
    {
        return objsToSpawn[Random.Range(0, objsToSpawn.Count)]; // Devuelve un objeto de la lista dado un índice aleatorio en un rango
    }

    private Vector3 GetPosition() // Método para obtener una posicion aleatoria en un área con unos límites
    {
        // Devuelve un Vector3 (posicion) a partir del punto en el que está el instanciador al que se le suman unos valores aleatorios de desplazamientos
        Vector3 pos = transform.position + new Vector3(Random.Range(-offset.x, offset.x), Random.Range(-offset.y, offset.y), Random.Range(-offset.z, offset.z));// Calculo posición en el área
        int timeOut = 100; // 100 intentos para buscar una posición libre
        while(CheckAvailablePosition(pos) == false && timeOut > 0) // Si no es buena posición o se ha agotado el número de repeticiones
        {
            pos = transform.position + new Vector3(Random.Range(-offset.x, offset.x), Random.Range(-offset.y, offset.y), Random.Range(-offset.z, offset.z)); // Calculo nueva posición en el área
            timeOut--; // Reducimos el contador de repeticiones
        }
        return pos; // Devuelvo la posición
    }

    private bool CheckAvailablePosition(Vector3 pos) // Método que determina si una posición es buena para instanciar
    {
        return Physics.OverlapSphere(pos, 1f, obstacleMask).Length == 0; // Si el número de objetos con el que choca al dibujar una esfera es cero significa que no hay obstaculos para instanciar
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
        Listas, Pilas y Pools
      </motion.h1>
      <p className="intro-text">Listas</p>
      <p>Las listas son colecciones dinámicas que almacenan elementos ordenados secuencialmente. A diferencia de los arrays, las listas pueden cambiar de tamaño en tiempo de ejecución, siendo ideales para trabajar con datos cuya cantidad no se conoce de antemano</p>


      <p><b>Características principales:</b></p>
      <div style={{ marginLeft: '20px' }}>
        <p><b>·</b> Los elementos se almacenan de forma ordenada y el primer elemento está en la posición 0</p>
        <p><b>·</b> Puedes agregar, eliminar y modificar elementos dinámicamente</p>
      </div>

      <img 
        src="/images/lista.png" 
        alt="Ejemplo de lista" 
        className="transparent-gif" 
      />
      
      <pre className="code-container">
          <code className="language-csharp">
            {`// Declaración de una lista   
private List<int> miLista;   // (visibilidad) List<TipoDeDato> (nombreLista);

// Inicialización de la lista
miLista = new List<int>();

// Declaración e inicialización en una sola línea
private List<int> otraLista = new List<int>();
`}
          </code>
        </pre>

      
      <p>Cuando declaras una lista como pública, Unity las inicializa automáticamente al asignarlas desde el Inspector. Sin embargo, se recomienda inicializarlas explícitamente para evitar errores en tiempo de ejecución</p>
      <img 
        src="/images/lista.gif" 
        alt="Ejemplo de lista" 
        className="movement-gif" 
      />
      
      <p><b>Operaciones con listas</b></p>
      <p>En Unity se pueden realizar varias operaciones sobre las listas usando los métodos de la clase <span className="codetext">List{'<'}T{'>'}</span></p>
      
      <pre className="code-container">
          <code className="language-csharp">
            {`// Añadir un elemento al final
myList.Add(T item);

// Añadir un elemento en una posición específica
myList.Insert(int index, T item);

// Eliminar un elemento (primera aparición)
myList.Remove(T item);

// Eliminar un elemento en una posición específica
myList.RemoveAt(int index);

// Comprobar si contiene un elemento
myList.Contains(T item);

// Obtener el índice de un elemento (primera aparición)
myList.IndexOf(T item);

// Vaciar la lista
myList.Clear();

// Tamaño de la lista
int size = myList.Count;

// Acceder a un elemento de la lista
T element = myList[int index];
`}
          </code>
        </pre>
    <br></br>
    
    <p><b>Bucles FOR</b></p>
    <p>Los bucles <span className="codetext">FOR</span> son herramientas excelentes para recorrer listas y ejecutar acciones sobre cada uno de sus elementos</p>

    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    // Declaración de una lista pública de enteros
    public List<int> myList;

    // Método Start que se ejecuta al inicio del juego
    void Start()
    {
        // Añadimos elementos a la lista
        myList.Add(-3);   // Agrega el número -3
        myList.Add(18);   // Agrega el número 18
        myList.Add(27);   // Agrega el número 27

        // Bucle FOR para recorrer la lista
        for (int i = 0; i < myList.Count; i++)  // Itera desde 0 hasta el tamaño de la lista
        {
            Debug.Log(myList[i]);   // Muestra en la consola el elemento en la posición i
        }
    }
}`}
          </code>
        </pre>
    
    <p>Recorrido con FOR:</p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>·</b> El bucle comienza en <span className="codetext">i=0</span> (el primer elemento)</p>
        <p><b>·</b> Se ejecuta mientras <span className="codetext">i</span> sea menor que el tamaño de la lista <span className="codetext">myList.Count</span></p>
        <p><b>·</b> En cada iteración, imprime en la consola el elemento actual de la lista accediendo con <span className="codetext">myList[i]</span></p>     
      </div>
      
    <p><b>Expresiones Lambda en Listas</b></p>
    <p>Las expresiones Lambda permiten simplificar y realizar operaciones complejas en listas mediante funciones que evalúan condiciones.</p>
    

    <div style={{ marginLeft: '20px' }}>
        <p><b>· Método Exists:</b> Evalúa si al menos un elemento de la lista cumple con la condición específica</p>
        <p><b>· Método Find:</b> Devuelve el primer elemento que cumple una condición</p>
        <p><b>· Método FindAll:</b> Obtener todos los elementos que cumplen la condición</p>     
    </div>

      <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    // Lista pública de GameObjects visible en el Inspector
    public List<GameObject> myList;

    void Start()
    {
        // Método Exists: Comprueba si al menos un objeto cumple la condición
        if (myList.Exists(obj => obj.transform.position.y > 0))
            Debug.Log("Hay al menos un objeto flotando");

        // Método Find: Devuelve el primer objeto que cumple la condición
        GameObject item = myList.Find(obj => obj.GetComponent<Health>().IsDead());
        if (item != null)
            Debug.Log(item + " está muerto");
    }
}`}
          </code>
        </pre>

        <p>La expresión lambda: <span className="codetext">obj ={'>'} obj.transform.position.y {'>'} 0</span> define la condición</p>

  <p className="intro-text">Pilas</p>
  <p>Una pila es una estructura de datos que sigue la lógica <b>LIFO</b> (Last in, First Out), es decir, el último elemento que se introduce es el primero en salir. Son útiles para realizar operaciones donde necesitas gestionar elementos de manera ordenada y reversible</p>
  
  <img 
        src="/images/stack.png" 
        alt="Stack" 
        className="transparent-gif" 
      />

    <pre className="code-container">
              <code className="language-csharp">
                {`public class Test : MonoBehaviour
{
    // Declaración de una pila pública
    public Stack<int> myStack;

    void Start()
    {
        // Inicialización de la pila
        myStack = new Stack<int>();

        // Insertar elementos en la pila (Push añade un elemento al final de la pila)
        myStack.Push(-7); 
        myStack.Push(15);

        // Consultar el elemento que está en la cima (Peek no elimina el elemento)
        if (myStack.Peek() > 0)
            Debug.Log(myStack.Pop()); // Extraer el elemento en la cima (Pop lo elimina)

        // Obtener el tamaño de la pila
        Debug.Log(myStack.Count);
    }
}
`}
              </code>
            </pre>
    
    <div style={{ marginLeft: '20px' }}>
        <p><b>· Inicialización:</b> La pila <span className="codetext">myStack</span> se declara como pública, pero debe inicializarse manualmente</p>
        <p><b>· Push:</b> Agrega un elemento al final de la pila</p>
        <p><b>· Peek:</b> Devuelve el elemento en la cima de la pila sin eliminarlo</p>    
        <p><b>· Pop:</b> Elimina y devuelve el elemento en la cima de la pila</p>     
        <p><b>· Count:</b> Retorna el número de elementos de la pila</p> 
    </div>

    <p>Las pilas son útiles para tareas como deshacer/rehacer, navegación entre escenas o niveles, y estructuras de orden temporal</p>
    

    <p className="intro-text">Colas</p>
    <p>Una cola es una estructura de datos que sigue el principio <b>FIFO</b> (First In, First Out), es decir, el primer elemento que se introduce es el primero en salir. Las colas son ideales para manejar tareas o elementos en un orden específico, como sistemas de turnos o procesamientos por lotes</p>
    <img 
        src="/images/Cola.png" 
        alt="Queue" 
        className="transparent-gif" 
      />


        <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    // Declaración de una cola pública
    public Queue<string> myQueue;

    void Start()
    {
        // Inicialización de la cola
        myQueue = new Queue<string>();

        // Agregar elementos a la cola
        myQueue.Enqueue("Jugador1");
        myQueue.Enqueue("Jugador2");
        myQueue.Enqueue("Jugador3");

        // Mostrar el primer elemento sin eliminarlo
        Debug.Log("Turno de: " + myQueue.Peek()); // Muestra: Jugador1

        // Quitar el primer elemento de la cola
        Debug.Log("Atendiendo a: " + myQueue.Dequeue()); // Elimina Jugador1

        // Mostrar el tamaño actual de la cola
        Debug.Log("Restantes en la cola: " + myQueue.Count); // Muestra: 2

        // Verificar si un jugador está en la cola
        if (myQueue.Contains("Jugador2"))
            Debug.Log("Jugador2 está esperando su turno.");
    }
}`}
          </code>
        </pre>

      <div style={{ marginLeft: '20px' }}>
        <p><b>· Inicialización:</b> La cola <span className="codetext">myQueue</span> se declara como pública, pero debe inicializarse manualmente</p>
        <p><b>· Enqueue(T item):</b> Añade un elemento al final de la cola</p>
        <p><b>· Dequeue():</b> Elimina y devuelve el primer elemento de la cola</p>    
        <p><b>· Peek():</b> Devuelve el primer elemento sin eliminarlo</p>     
        <p><b>· Contains(T item):</b> Verifica si la cola contiene un elemento específico</p> 
        <p><b>· Clear():</b> Vacía la cola</p> 
        <p><b>· Count():</b> Retorna el número de elementos en la cola</p> 
    </div>
    <p>Las colas son útiles para sistemas de turnos, procesamiento en orden, o cualquier situación donde los elementos deban ser atendidos en el orden en que llegaron</p>
    

  <p className="intro-text">Matrices</p>
  <p>Una matriz puede ser representada como una lista de listas. Esto permite organizar datos en filas y columnas, lo que es útil para manejar estructuras bidimensionales como tableros, mapas o grids</p>

    <img 
        src="/images/matrix.gif" 
        alt="Collision Matrix" 
        className="movement-gif" 
      />

    <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    // Declaramos una lista de listas que actuará como matriz
    public List<List<int>> myMatrix;
    public int rows, columns;

    void Start()
    {
        // Inicializamos la matriz como una lista de listas
        myMatrix = new List<List<int>>();

        // Llenar la matriz con valores aleatorios
        for (int i = 0; i < columns; i++) // Iterar por columnas
        {
            myMatrix.Add(new List<int>()); // Crear una nueva fila
            for (int j = 0; j < rows; j++) // Iterar por filas
            {
                // Agregar un número aleatorio entre 0 y 9
                myMatrix[i].Add(Random.Range(0, 10));
            }
        }

        // Crear una cadena que represente la matriz
        string matrixCad = "";
        for (int i = 0; i < rows; i++) // Iterar por filas
        {
            for (int j = 0; j < columns; j++) // Iterar por columnas
            {
                matrixCad += myMatrix[j][i] + " "; // Agregar el valor de la celda
            }
            matrixCad += '\\n'; // Nueva línea para cada fila
        }

        // Mostrar la matriz en la consola
        Debug.Log(matrixCad);
    }
}`}
          </code>
        </pre>

      

        <p className="intro-text">Set Active</p>
        <p>En Unity, el método <span className="codetext">setActive</span> permite activar o desactivar un GameObject en tiempo de ejecución. Cuando un GameObject está desactivado, no se renderiza, ni se actualizan sus scripts ni interactúa con el entorno. Es una herrmanienta muy útil para manejar la visibilidad y el comportamiento de los objetos en la escena</p>
        
        <pre className="code-container">
          <code className="language-csharp">
            {`using UnityEngine;

public class Test : MonoBehaviour
{
    // Referencia a otro GameObject desde el editor
    public GameObject otroObjeto;

    void Start()
    {
        // Desactivo el objeto referenciado al iniciar el juego
        otroObjeto.SetActive(false);
    }
}`}
          </code>
        </pre>
        
        <img 
        src="/images/active.gif" 
        alt="Ejemplo SetActive" 
        className="movement-gif" 
      />

  
  <p className="intro-text">OnEnable</p>
  <p>El método <span className="codetext">OnEnable</span> es un método especial de Unity que se ejecuta automáticamente cada vez que un objeto se activa, ya sea al inicial la escena o mediante un cambio en su estado</p>
            
    <pre className="code-container">
          <code className="language-csharp">
            {`public class Test : MonoBehaviour
{
    void Start()
    {
        // Repite la llamada al método "TurnActivate" cada segundo, empezando después de 1 segundo
        InvokeRepeating("TurnActivate", 1, 1);
    }

    void OnEnable()
    {
        // Incrementa el tamaño del objeto cada vez que se activa
        transform.localScale += Vector3.one;
    }

    void TurnActivate()
    {
        // Cambia el estado de actividad del objeto entre activado y desactivado
        gameObject.SetActive(!gameObject.activeInHierarchy);
    }
}
`}
          </code>
        </pre>
    
      <img 
        src="/images/scale.gif" 
        alt="Ejemplo OnEnable" 
        className="movement-gif" 
      />

      <div style={{ marginLeft: '20px' }}>
        <p><b>· InvokeRepeating:</b> Llama al método <span className="codetext">TurnActivate</span> repetidamente cada segundo, alternando entre activado y desactivado</p>
        <p><b>· OnEnable:</b> Se ejecuta cada vez que el objeto se activa, aumentando el tamaño del objeto</p>
      </div>
      <p><span className="codetext">OnEnable</span> es útil para inicializar valores o ejecutar acciones cada vez que un objeto pasa a estar activo en la escena</p>
    
    
      <p className="intro-text">Pooling</p>
      <p>El <b>Pooling</b> es una técnica que optimiza el rendimiento al activar/desctivar objetos en lugar de instanciarlos o destruirlos repetidamente, evitando la sobrecarga que estas operaciones generan en tiempo de ejecución</p>

      <pre className="code-container">
          <code className="language-csharp">
            {`public class Pool : MonoBehaviour
{
    public List<GameObject> objPool; // Lista que contiene los objetos del pool

    void Update()
    {
        // Si se presiona la tecla Espacio, activa un objeto disponible en el pool
        if (Input.GetKeyDown(KeyCode.Space))
            GetFreeObject().SetActive(true); // Activa un objeto que estaba desactivado
    }

    public GameObject GetFreeObject()
    {
        // Encuentra el primer objeto desactivado en el pool y lo devuelve
        return objPool.Find(item => item.activeInHierarchy == false);
    }
}`}</code>
        </pre>


    <div style={{ marginLeft: '20px' }}>
        <p><b>· </b> El método <span className="codetext">GetFreeObject()</span> encuentra un objeto que esta desactivado</p>
        <p><b>· </b> Este objeto es activado con <span className="codetext">SetActive(true)</span> cuando es necesario</p>
    </div>

    <img 
        src="/images/pool_1.gif" 
        alt="Ejemplo Spawner" 
        className="movement-gif" 
      />

    <p>Hay que desactivar los objetos para que vuelvan a estar disponibles</p>
    <pre className="code-container">
              <code className="language-csharp">
                {`public class PoolItem : MonoBehaviour
{
    public float lifeTime; // Tiempo de vida del objeto activo

    void OnEnable()
    {
        // Desactiva el objeto después de un tiempo definido por "lifeTime"
        Invoke("Deactivate", lifeTime);
    }

    void Deactivate()
    {
        // Desactiva el objeto para que vuelva a estar disponible en el pool
        gameObject.SetActive(false);
    }
}`}</code>
            </pre>

    <p><b>Ventajas</b></p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>· Reducción de cargas de memoria</b> Evita la creación y destrucción repetida de objetos</p>
        <p><b>· Mejor rendimiento</b> Ideal para objetos que se usan  reutilizan frecuentemente, como balas, enemigos o partículas</p>
    </div>

    <img 
        src="/images/pool_2.gif" 
        alt="Ejemplo Balas" 
        className="movement-gif" 
      />

    <p className="intro-text">Ejemplo Práctico</p>
    
    <img 
        src="/images/ejercicio_listas.png" 
        alt="Escena con solución" 
        className="movement-gif" 
      />

    <p>En la siguiente escena debemos hacer los siguientes puntos:</p>
    <p>1) Los vehículos usan <b>dos teclas para moverse y dos para rotar</b></p>
    <p>2) Mientras la comida espera a ser recogida <b>rota sobre si misma</b></p>
    <p>3) Cuando un vehículo pasa por encima de una comida la almacena como munición</p>
    <p>4) Con cada pulsación de una tecla el vehículo dispara la comida almacenada</p>
    <p>5) El orden en el que dispara la comida es el <b>contrario</b> al que fue recogida</p>
    <p>6) Los vehículos tienen un sistema de salud (al recibir X disparos se destruyen)</p>
    <p>7) Al colisionar la comida con un vehículo, éste recibe u impacto e instancia partículas</p>
    <p>8) Una comida aleatoria se instancia en una posición aleatoria cada 2 segundos</p>
    <p>9) La comida no puede instanciarse encima de otras comidas o de vehículos</p>

    <p><b>Solución: Por partes</b></p>
    
    <p>Para el primer ejercicio la solución se encuentra en el apartado de <b>Inputs</b></p>
    <p>Conseguir que la comida rote sobre si misma es muy fácil, pues es añadir un script a los prefabs con la lína <span className="codetext">transform.Rotate(Vector3.up * rotateSpeed * Time.deltaTime);</span> </p>
    
    <img 
        src="/images/gira.gif" 
        alt="Comida girando" 
        className="movement-gif" 
      />

    <p>Por otra parte, los puntos 3, 4 y 5 los vamos a hacer a la vez teniendo en cuenta lo siguiente:</p>
    <div style={{ marginLeft: '20px' }}>
        <p><b>· Gestionar colisiones</b></p>
        <p><b>· Usar pilas</b></p>
        <p><b>· Disparar comida</b></p>
    </div>

    <p>Para gestionar las colisiones simplemente se usa un <span className="codetext">OnTriggerEnter()</span> y detectar si los objetos tienen el tag <b>Food</b></p>
    <p>Al detectar que es comida, se añade a una pila con <span className="codetext">foodStack.Push(other.gameObject);</span> </p>
    <p>Queremos que sea una pila porque se pide que la comida se dispare en el orden contrario al ser recogida [LIFO]</p>
    <p>Al acabar desactivamos la comida para que no se vea más en la escena</p>

    <img 
        src="/images/comida_coger.gif" 
        alt="Ejemplo coger comida" 
        className="movement-gif" 
      />
    <p>Al momento de disparar nos podemos dar cuenta de que la comida también está girando, por lo que usaremos un <span className="codetext">bool</span> que nos indicará si la comida ha sido disparada o si está esperando a ser recogida. De esta forma podemos también controlar las colisiones usando un único prefab (pues si hacemos que la comida quite vida, lo hará toda si no las diferenciamos)</p>
    <p>Para disparar la comida se usa <span className="codetext">foodStack.Pop()</span>, para acceder al primer componente de la lista</p>

    <p>El sistema de salud utilizado es el mismo que se usó en <b>Colliders</b></p>
    <p>Para las partículas se ha creado un script que las destruye al segundo de aparecer, y solamente se instancian cuando la bala choca con cualquier objeto con collider que no tenga el tag <b>Food</b>. Pues no queremos que la comida pueda colisionar entre ella</p>
    <img 
        src="/images/disparo_prt.gif" 
        alt="Partículas comida" 
        className="movement-gif" 
      />

    <p>Por último, vamos a realizar el spawner</p>
    <p>Lo primero es crear una <b>lista</b> donde poder añadir todos los prefabs que queremos instanciar, además de un <b>offset</b> para determinar el área donde se van a instanciar y una <b>layerMask</b> para añadir las capas sobre las que no se puede instanciar</p>

    <img 
        src="/images/spawn_settings.png" 
        alt="Editor Spawn" 
        className="vertical-gif" 
      />

      <p>Tras calcular la posición donde puede hacer spawn la comida, se usa un <span className="codetext">InvokeRepeating()</span> para llamar a los métodos cada cierto tiempo</p>

<img 
        src="/images/allfood.png" 
        alt="Ejemplo Spawn lleno" 
        className="movement-gif" 
      />

    <p>Como siempre, se presentan los códigos completos bien comentados para que se entienda todo mejor</p>

    <div className="code-container2">
      <div className="code-header">
        {/* Selector de pestañas */}
        <button
          className={`tab-button ${activeCode === 'codigo1' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo1')}
        >
          CarController
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo2' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo2')}
        >
          Food
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo3' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo3')}
        >
          FoodShooter
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo4' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo4')}
        >
          Health
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo5' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo5')}
        >
          Destroyer
        </button>
        <button
          className={`tab-button ${activeCode === 'codigo6' ? 'active' : ''}`}
          onClick={() => setActiveCode('codigo6')}
        >
          Spawner
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
        src="/images/comida_disparo.gif" 
        alt="Escena con solución" 
        className="movement-gif" 
      />

      </div>

      

    </>
  );
}