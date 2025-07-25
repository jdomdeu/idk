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
        Quaternions
      </motion.h1>
      
      
      <p className="intro-text">Rotaciones en Unity: Euler Angles</p>
      <p>Los <b>Euler Angles</b> son una forma de representar la rotación de un objeto usando un <b>Vector3(X, Y, Z)</b>, donde cada componente indica la rotación en grados sobre su respectivo eje</p>      
      
      <img 
        src="/images/euler.gif" 
        alt="Inspector con la Clase Interna" 
        className="vertical-gif" 
      />

      <p>La rotación de los objetos en el <b>Inspector de Unity</b> se muestran en Euler Angles</p>

      <img 
        src="/images/euler_rotation.png" 
        alt="Inspector con la Clase Interna" 
        className="vertical-gif" 
      />

      <p>La rotación se aplica de manera <b>secuencial</b> en el orden Y --{'>'} X --{'>'} Z</p>

      <pre className="code-container">
          <code className="language-csharp">
            {`transform.rotation = Quaternion.Euler(45, 90, 0); // Rotar un objeto 45° en X y 90° en Y`}
          </code>
        </pre>
        <br></br>
    
    
    <p><b>Gimbal Lock</b></p>
    <p>El <b>Gimbal Lock</b> ocurre cuando dos de los tres ejes de rotación se alinean, eliminando un grado de libertad y haciendo imposible rotar en ciertas direcciones. Esto se debe a la forma secuencial en que se aplican las rotaciones</p>
    <img 
        src="/images/gimbalLock.gif" 
        alt="Inspector con la Clase Interna" 
        className="vertical-gif" 
      /><br></br>

    <a href="https://www.youtube.com/watch?v=zc8b2Jo7mno&t=37s" target="_blank"><b>Vídeo Explicativo
    </b></a>

    <p>Para reducir la probabilidad de encontrarlo, se puede <b>cambiar el orden de las rotaciones</b>. Aunque solo sirve en ciertos escenarios</p>

    <pre className="code-container">
          <code className="language-csharp">
            {`Quaternion rotation = Quaternion.AngleAxis(xAngle, Vector3.right) *
                      Quaternion.AngleAxis(zAngle, Vector3.forward) *
                      Quaternion.AngleAxis(yAngle, Vector3.up);

// Se ha cambiado el orden de aplicación de las rotaciones a X -> Z -> Y`}
          </code>
        </pre>
    
    
    <br></br>

    <p className="intro-text">Quaternions</p>
    <p>Los <b>Quaternions</b> son una forma de representar rotaciones 3D de manera eficiente y sin las limitaciones de los Euler Angles. Ofrecen rotaciones suaves, precisas y sin Gimbal Lock</p>
    
    <p><u>¿Cómo funcionan?</u></p>
    <p> Un <b>Quaternion</b> se representa con cuatro valores <span className="codetext">(x, y, z, w)</span>, pero estos valores no representan ángulos directamente. En lugar de grados, los Quaternions definen una rotación de forma <b>abstracta</b> pero más efectiva</p>
    
    <img 
        src="/images/matrix_quaternion.png" 
        alt="Inspector con la Clase Interna" 
        className="vertical-gif" 
      /><br></br>

    <p>En Unity, las rotaciones internamente se manejan con <b>Quaternions</b>, aunque en el Inspector aparecen como <b>Euler Angles</b> para facilitar la lectura</p>
    
    <p><b>Conclusión:</b></p>
      <div style={{ marginLeft: '20px' }}>
        <p><b>· No es necesario</b> entender la matemática avanzada de los Quaternions para usarlos</p>
        <p><b>·</b> Unity ofrece <b>métodos</b> para trabajar con ellos</p>
        <p><b>·</b> Las rotaciones son más <b>estables y fuidas</b></p>
        <p><b>· No es recomedable</b> acceder a estos números directamente</p>
      </div>
     
      <br></br>

      <p className="intro-text">Quaternion - Conversiones</p>
      <p>Aunque internamente las rotaciones se manejan con <b>Quaternions</b>, a veces es necesario convertirlas a <b>Euler Angles</b> para trabajar con valores más comprensibles</p>
      
      <p><b>De Quaternion a Euler Angles</b></p>
      <p>Podemos extraer los Euler Angles de un objeto con la propiedad <span className="codetext">.eulerAngles</span></p>
      <pre className="code-container">
          <code className="language-csharp">
            {`Quaternion rot = transform.rotation; // Obtiene la rotación del objeto
Vector3 eulerAngles = rot.eulerAngles; // Convierte a Euler Angles
`}
          </code>
        </pre>
        <br></br>

    <p><b>De Euler Angles a Quaternion</b></p>
    <p>Si tenemos una rotación expresada en Euler Angles, podemos convertirla a Quaternion usando <span className="codetext">Quaternion.Euler()</span></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`Quaternion newRot = Quaternion.Euler(eulerAngles);
newRot = Quaternion.Euler(0, 75, 0); // Crea una rotación de 75° en Y
`}
          </code>
        </pre>
        <p>Es útil cuando queremos aplicar una rotación específica sin preocuparnos por el Gimbal Lock</p>
        

        <p><b>Diferentes representaciones</b></p>
        <p>Los valores de <b>Euler Angles</b> pueden variar incluso si representan la misma rotación</p>
        <pre className="code-container">
          <code className="language-csharp">
            {`Quaternion myRotation = Quaternion.identity; // Rotación sin cambios
myRotation.eulerAngles = new Vector3(150, 35, 45); // Asigna una rotación
Debug.Log(myRotation.eulerAngles); // Puede imprimir (30.0, 215.0, 225.0)`}
          </code>
        </pre>
        <p><u>¿Por qué ocurre esto?</u></p>
        <div style={{ marginLeft: '20px' }}>
        <p><b>·</b> Euler Angles puede representar la misma rotación con diferentes combinaciones de valores</p>
        <p><b>·</b> Unity optimiza los valores de rotación para evitar problemas de Gimbal Lock</p>
      </div>
      <br></br>


    <p className="intro-text">Quaternion - LookRotation</p>
    <p><span className="codetext">Quaternion.LookRotation</span> es una función en Unity que permite orientar un objeto en la dirección de un <b>Vector3</b> de forma sencilla y eficiente</p>

    <pre className="code-container">
          <code className="language-csharp">
            {`public static Quaternion LookRotation(Vector3 forward, Vector3 upwards = Vector3.up);`}
          </code>
        </pre>
        <div style={{ marginLeft: '20px' }}>
        <p><span className="codetext">forward</span>: La dirección hacia la que queremos que mire el objeto</p>
        <p><span className="codetext">upwards</span>(opcional): Define qué dirección se considera "arriba" en la rotación (por defecto es <span className="codetext">Vector3.up</span>)</p>
      </div>
  
  <br></br>
  <p><u>Ejemplo: Apuntar a un objetivo</u></p>
  <p>Si queremos que un objeto mire hacia <span className="codetext">targetPos</span>, primero calculamos la dirección y luego usamos <span className="codetext">LookRotation</span></p>

  <pre className="code-container">
          <code className="language-csharp">
            {`Vector3 dir = targetPos - transform.position; // Calcula dirección al objetivo
transform.rotation = Quaternion.LookRotation(dir); // Rota el objeto hacia el objetivo`}
          </code>
        </pre>

  <br></br>
  <p><b>Ejemplo Práctico</b></p>
 
    <p>Programa un script para que el soldado se <b>oriente</b> a la bala usando <b>Quaternion</b></p>
    <img 
        src="/images/lookAt_Ejercicio.png" 
        alt="Touch Grass" 
        className="movement-gif" 
      />

  <p><b>Solución</b></p>
  <p>Se añade el script al soldado y se arrastra en el Inspector el objeto de la bala</p>

  <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LookRotationTest : MonoBehaviour
{
    public Transform targetT;
    private Vector3 dir;

    void Update()
    {
        if (targetT)
        {
            // Calcula la dirección hacia el objetivo
            dir = targetT.position - transform.position;

            // Mantiene la misma altura en el eje Y (evita inclinaciones)
            dir.y = transform.position.y;

            // Aplica la rotación para mirar hacia el objetivo
            transform.rotation = Quaternion.LookRotation(dir);
        }
    }
}
`}
          </code>
        </pre>
        <br></br>

        <img 
        src="/images/lookAtSolution.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />


      <p className="intro-text">Quaternion - AngleAxis</p>
      <p>Este método permite crear una <b>rotación</b> en torno a un eje específico por un determinado número de grados</p>
      <pre className="code-container">
          <code className="language-csharp">
            {`public static Quaternion AngleAxis(float angle, Vector3 axis);`}
          </code>
        </pre>
      <p><u>Ejemplo: Vector dirección</u></p>
      <pre className="code-container">
          <code className="language-csharp">
            {`transform.forward = Quaternion.AngleAxis(45f, Vector3.up) * transform.forward;`}
          </code>
        </pre>

        <p>En este caso, el objeto rota 45 grados sobre el eje Y (Vector3.up), afectando a su dirección forward</p>


        <img 
        src="/images/girarQuaternion.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />

      <p><b>Orden de los factores en la multiplicación</b></p>
      <div style={{ marginLeft: '20px' }}>
        <p><b>·</b> El orden de la multiplicación de Quaternions y Vectores <b>importa</b></p>
        <p><b>·</b> Multiplicar un vector por un Quaternion <b>aplica la rotación al vector</b></p>
        <p><b>·</b> Si se invierte el orden, el resultado será diferente o incluso incorrecto</p>
      </div>
      <br></br>

      <p><b>Ejemplo Práctico</b></p>
      <p>En este ejemplo, implemetaremos un sistema de <b>movimiento en 8 direcciones</b> que se <b>adapte</b> a la rotación de la cámara en el eje Y</p>
      <p>Hasta ahora, cuando movíamos a un personaje con <span className="codetext">transform.forward</span>, este de desplazaba según su propia orientación. Lo que no siempre coincide con la dirección en la que queremos que se mueva respecto a la cámara</p>
      
      <p><u>Problema inicial</u></p>
      <p>Si solo pulsamos "W" y giramos la cámara, el personaje <b>no cambia su orientación</b>; simplemente sigue avanzando en su propia dirección, sin importar hacia donde mira la cámara</p>

      <img 
        src="/images/GirarMal.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />
      <p>En el caso de arriba, el personaje <b>no ajusta su dirección</b> de movimiento, lo que puede hacer que los controles se sientan poco intuitivos</p>
      <p><b>Solución</b></p>
      <p>Mediante el uso de <span className="codetext">Quaternion.AngleAxis</span> hacemos que el personaje <b>adapte su dirección</b> de movimiento a la rotación de la cámara. Asegurando un desplazamiento más natural e intuitivo</p>
      <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AngleAxisTest : MonoBehaviour
{
    
    public float moveSpeed;
    public float cameraRotateSpeed;
    public Transform cameraT;

    void Update()
    {
        // Captura la entrada del usuario en los ejes horizontal y vertical
        float h = Input.GetAxisRaw("Horizontal"); 
        float v = Input.GetAxisRaw("Vertical"); 

        // Si hay entrada de movimiento
        if(h != 0 || v != 0)
        {
            // Se crea un vector de dirección con los valores de entrada
            Vector3 moveDir = new Vector3(h, 0, v);

            // Se ajusta la dirección de movimiento según el ángulo de la cámara
            moveDir = Quaternion.AngleAxis(cameraT.eulerAngles.y, Vector3.up) * moveDir;

            // Se establece la orientación del objeto en la dirección de movimiento
            transform.forward = moveDir;

            // Se mueve el objeto hacia adelante en la nueva dirección
            transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
        }

        if(Input.GetKey(KeyCode.Q))
            cameraT.RotateAround(Vector3.zero, Vector3.down, cameraRotateSpeed * Time.deltaTime);

        if(Input.GetKey(KeyCode.E))
            cameraT.RotateAround(Vector3.zero, Vector3.up, cameraRotateSpeed * Time.deltaTime);
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/girarBien.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />
      <br></br>
      <p className="intro-text">Quaternion - Angle</p>
      <p>El método <span className="codetext">Quaternion.Angle</span> nos permite conocer la <b>diferencia angular entre dos rotaciones</b>, lo que es útil para detectar si dos objetos tienen orientaciones similares o para interpolar entre ángulos</p>
    
      <pre className="code-container">
          <code className="language-csharp">
            {`public static float Angle(Quaternion a, Quaternion b);
// Devuelve el ángulo en grados entre dos Quaternion`}
          </code>
        </pre>

    <p><u>Ejemplo: Comparar la orientación de dos objetos</u></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`public Transform otherT;
public float angleOffset;

void Update()
{
    if (Quaternion.Angle(transform.rotation, otherT.rotation) < angleOffset)
    {
        Debug.Log("Tenemos rotación similar");
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/comparaGiro.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />
      <br></br>
    <p><b>Ejemplo Práctico</b></p>
    <p>Programa un script que permita saber si el orco ve al soldado en un ángulo de visión usando <span className="codetext">Quaternion.Angle</span></p>
    <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OrcVision : MonoBehaviour
{
    public Transform soldier;
    public float visionAngle = 60f;  // Ángulo de visión del orco

    void Update()
    {
        // Calcular la dirección hacia el soldado
        Vector3 directionToSoldier = soldier.position - transform.position;
        directionToSoldier.y = 0; // Ignorar la diferencia en altura

        // Calcular el ángulo entre la orientación del orco y la dirección al soldado
        float angle = Quaternion.Angle(transform.rotation, Quaternion.LookRotation(directionToSoldier));

        // Si el soldado está dentro del ángulo de visión, el orco lo ve
        if (angle < visionAngle / 2)
        {
            Debug.Log("¡El orco ha visto al soldado!");
        }
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/OrcoMira.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />
      <br></br>


  <p className="intro-text">Quaternion - RotateTowards</p>
  <p>Este método permite <b>interpolar entre dos rotaciones</b> (<span className="codetext">from</span> y <span className="codetext">to</span>) a una velocidad definida (<span className="codetext">maxDegreesDelta</span>). Es útil para <b>suavizar</b> la transición de una rotación a otra</p>
  
  <pre className="code-container">
          <code className="language-csharp">
            {`Quaternion RotateTowards(Quaternion from, Quaternion to, float maxDegreesDelta);`}
          </code>
        </pre>


  <p><u>Ejemplo: Hacer que un objeto tenga la misma rotación que otro</u></p>
  <pre className="code-container">
          <code className="language-csharp">
            {`public Transform otherT;  
public float rotateSpeed;

void Update()
{
    float step = rotateSpeed * Time.deltaTime; // Cantidad de grados a rotar en este frame
    transform.rotation = Quaternion.RotateTowards(transform.rotation, otherT.rotation, step);
}`}
          </code>
        </pre>

        <img 
        src="/images/giramos.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />
      <br></br>
  <p><b>Ejemplo Práctico</b></p>
  <p>Programa un script que <b>rote</b> el cañón en el tiempo para <b>mirar</b> al enemigo usando <span className="codetext">Quaternion.RotateTowards</span></p>

  <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RotateTowardsTest : MonoBehaviour
{
    public Transform orcT;  
    public float rotateSpeed = 60f;  
    private Vector3 dir;  // Dirección hacia la que queremos rotar

    private void Update()
    {
        // Calculamos la dirección desde nuestra posición hasta la del orco
        dir = orcT.position - transform.position;

        // Usamos Quaternion.RotateTowards para girar gradualmente hacia el orco
        Quaternion.RotateTowards(transform.rotation, Quaternion.LookRotation(dir), rotateSpeed * Time.deltaTime);
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/mirarQuaternion.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />
      <br></br>


      <p className="intro-text">Quaternion - Lerp</p>
      <p><span className="codetext">Quaternion.Lerp</span> se utiliza para interpolar suavemente entre <b>dos rotaciones</b>, generando una rotación intermedia en función de un valor <span className="codetext">t</span> entre 0 y 1</p>

      <pre className="code-container">
          <code className="language-csharp">
            {`public static Quaternion Lerp(Quaternion a, Quaternion b, float t);

// a: Primera rotación
// b: Segunda rotación
// t: Valor de interpolación entre 0 y 1
//      t = 0 -->   Devuelve a
//      t = 1 -->   Devuelve b
//      t = 0.5 --> Devuelve una rotación intermedia`}
          </code>
        </pre>

    <p><u>Ejemplo: Rotación intermedia</u></p>

    <pre className="code-container">
          <code className="language-csharp">
            {`public Transform t1, t2;  // Dos objetos con diferentes rotaciones

void Start()
{
    // Aplica una rotación intermedia entre t1 y t2 (50% de cada una)
    transform.rotation = Quaternion.Lerp(t1.rotation, t2.rotation, 0.5f);
}`}
          </code>
        </pre>

        <img 
        src="/images/lerp1.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />

  <br></br>
  <p><b>Ejemplo Práctico</b></p>
  <p>Programa un script que <b>genere una fila</b> de enemigos con rotaciones aleatorias entre una mínina y una máxima usando <span className="codetext">Quaternion.Lerp</span></p>
  
  <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LerpTest : MonoBehaviour
{
    public GameObject objPrefab; 
    public float angle;   // Ángulo máximo de variación en la rotación

    void Start()
    {
        // Definir los límites de la rotación mínima y máxima en el eje Y
        Quaternion minRot = Quaternion.Euler(0, -angle / 2, 0);
        Quaternion maxRot = Quaternion.Euler(0, angle / 2, 0);

        // Generar 10 objetos con rotaciones aleatorias entre los límites establecidos
        for (int i = 0; i < 10; i++)
        {
            // Interpola una rotación entre minRot y maxRot usando un valor aleatorio entre 0 y 1
            Quaternion rot = Quaternion.Lerp(minRot, maxRot, Random.value);

            // Instancia el objeto en la escena con la rotación calculada
            Instantiate(objPrefab, transform.position + Vector3.right * i, rot);
        }
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/lerp2.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />
<br></br>
<p><b>Ejemplo Práctico 2</b></p>
  <p>Programa un script que <b>gire el cañón automáticamente</b> de una rotación inicial a otra con desaceleración usando <span className="codetext">Quaternion.Lerp</span></p>
  
  <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LerpTest2 : MonoBehaviour
{
    public Transform initialT; 
    public Transform finalT;   
    public float rotateFactor = 1;  // Velocidad de interpolación

    private bool rotationFinished; // Indica si la rotación ha finalizado

    private void OnDrawGizmos()
    {
        // Dibuja líneas en la escena para visualizar las direcciones inicial y final
        Gizmos.color = Color.yellow;
        Gizmos.DrawRay(transform.position, initialT.forward * 10f);
        Gizmos.DrawRay(transform.position, finalT.forward * 10f);
    }

    private void Awake()
    {
        // Establece la rotación inicial
        transform.rotation = initialT.rotation;
    }

    void Update()
    {
        if (!rotationFinished) // Si la rotación aún no ha terminado
        {
            // Interpola progresivamente entre la rotación actual y la final
            transform.rotation = Quaternion.Lerp(transform.rotation, finalT.rotation, Time.deltaTime * rotateFactor);

            // Si la diferencia de ángulo entre la rotación actual y la final es mínima, considera la rotación terminada
            if (Quaternion.Angle(transform.rotation, finalT.rotation) < 0.5f)
            {
                transform.rotation = finalT.rotation; // Corrección opcional para evitar imprecisiones
                rotationFinished = true;             // Marcar la rotación como terminada
            }
        }
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/lerp3.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />


<br></br>
<p><b>Ejemplo Práctico 3</b></p>
  <p>Programa un script que nos permita <b>girar el cañón dentro de unos límites</b></p>
  
  <pre className="code-container">
          <code className="language-csharp">
            {`using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LerpTest3 : MonoBehaviour
{
    public float rotationFactor;    // Factor de velocidad de rotación
    public float angle; 
    private float rotValue = 0.5f;     // Inicializado en 0.5f para estar en el centro
    private Quaternion minRot, maxRot; 

    private void Awake()
    {
        // Se calculan las rotaciones mínima y máxima usando el ángulo proporcionado
        minRot = Quaternion.AngleAxis(-angle / 2, Vector3.up);
        maxRot = Quaternion.AngleAxis(angle / 2, Vector3.up);
    }

    // Método utilizado para dibujar las líneas de referencia en el editor
    private void OnDrawGizmos()
    {
        Vector3 dir = Quaternion.Euler(0, -angle / 2, 0) * Vector3.forward * 10f;
        Gizmos.DrawRay(transform.position, dir);

        dir = Quaternion.Euler(0, angle / 2, 0) * Vector3.forward * 10f;
        Gizmos.DrawRay(transform.position, dir);
    }

    void Update()
    {
        // Se ajusta rotValue para aumentar o disminuir su valor basado en la entrada del jugador, dentro de los límites de 0 y 1
        rotValue = Mathf.Clamp(rotValue + Input.GetAxisRaw("Horizontal") * rotationFactor * Time.deltaTime, 0, 1);

        // Si rotValue es 0, el cañón estará en la rotación mínima; si es 1, estará en la rotación máxima
        transform.rotation = Quaternion.Lerp(minRot, maxRot, rotValue);
    }
}`}
          </code>
        </pre>

        <img 
        src="/images/lerp4.gif" 
        alt="Touch Grass" 
        className="movement-gif" 
      />
      <br></br>
      <p className="intro-text">Quaternion - Otras Utilidades</p>

      <pre className="code-container">
          <code className="language-csharp">
            {`// Rotación aleatoria
Quaternion rot = Random.rotation;

// Rotación de 180º
transform.rotation *= Quaternion.Euler(0, 180f, 0f);

// Rotación inversa (reflejar rotación) --> útil para que un objeto se gire de vuelta
Quaternion ineverseRot = Quaternion.Inverse(rot);`}
          </code>
        </pre>
<br></br>




      

      </div>

      

    </>
  );
}