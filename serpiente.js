// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// Constante para el tamaño de cada celda de la cuadrícula
const TAMANIO_CELDA = 25;

// Arreglo que representa el cuerpo de la serpiente
let serpiente = [
    { x: 3, y: 3 }, // Cabeza
    { x: 2, y: 3 }, // Cuerpo
    { x: 1, y: 3 }  // Cuerpo
];

// Variables globales para el juego
let direccionActual = "derecha";
let intervaloSerpiente = null;
let puntaje = 0;

// Objeto para la comida
let comida = {
    x: 5,
    y: 5
};

// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para dibujar el tablero (cuadrícula)
function dibujarTablero() {
    ctx.strokeStyle = "#1e293b"; 
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Función para pintar una celda individual
function pintarParte(lineax, lineay, esCabeza = false, esComida = false) {
    const xReal = lineax * TAMANIO_CELDA;
    const yReal = lineay * TAMANIO_CELDA;

    if (esComida) {
        ctx.fillStyle = "#38bdf8"; // Celeste para la comida
        ctx.strokeStyle = "#0284c7";
    } else {
        ctx.fillStyle = esCabeza ? "#facc15" : "#ef4444"; // Amarillo cabeza, Rojo cuerpo
        ctx.strokeStyle = "#b91c1c";
    }

    ctx.fillRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);
    ctx.strokeRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);
}

// Función para recorrer y pintar toda la serpiente
function pintarSerpiente() {
    for (let i = 0; i < serpiente.length; i++) {
        const parte = serpiente[i];
        const esCabeza = (i === 0);
        pintarParte(parte.x, parte.y, esCabeza, false);
    }
}

// Función para pintar la comida
function pintarComida() {
    pintarParte(comida.x, comida.y, false, true);
}

function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero(); 
    pintarComida();
    pintarSerpiente();
}

// =========================
// FUNCIONES DE MOVIMIENTO
// =========================

function moverDerecha() {
    const cabezaActual = serpiente[0];
    const nuevaCabeza = { x: cabezaActual.x + 1, y: cabezaActual.y };
    serpiente.unshift(nuevaCabeza);
}

function moverIzquierda() {
    const cabezaActual = serpiente[0];
    const nuevaCabeza = { x: cabezaActual.x - 1, y: cabezaActual.y };
    serpiente.unshift(nuevaCabeza);
}

function moverArriba() {
    const cabezaActual = serpiente[0];
    const nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y - 1 };
    serpiente.unshift(nuevaCabeza);
}

function moverAbajo() {
    const cabezaActual = serpiente[0];
    const nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y + 1 };
    serpiente.unshift(nuevaCabeza);
}

// =========================
// CONTROL DE DIRECCIÓN Y BUCLE
// =========================

function cambiarDireccion(dir) {
    direccionActual = dir;
}

// Función que genera una nueva posición aleatoria para la comida
function generarComida() {
    const maxColumnas = canvas.width / TAMANIO_CELDA;
    const maxFilas = canvas.height / TAMANIO_CELDA;

    comida.x = Math.floor(Math.random() * maxColumnas);
    comida.y = Math.floor(Math.random() * maxFilas);
}

// Detectar si la cabeza coincide con la comida
function atrapaComida() {
    const cabeza = serpiente[0];
    return cabeza.x === comida.x && cabeza.y === comida.y;
}

// Movimiento automático que se ejecuta en cada intervalo de tiempo
function moverSerpiente() {
    // 1. Mover según la dirección actual
    if (direccionActual === "derecha") {
        moverDerecha();
    } else if (direccionActual === "izquierda") {
        moverIzquierda();
    } else if (direccionActual === "arriba") {
        moverArriba();
    } else if (direccionActual === "abajo") {
        moverAbajo();
    }

    // 2. Validar si atrapa la comida
    if (atrapaComida()) {
        puntaje += 10;
        document.getElementById("puntaje").textContent = puntaje;
        generarComida();
        // Si come, NO hacemos pop() para permitir que crezca
    } else {
        // Si no come, eliminamos la cola para mantener el tamaño
        serpiente.pop();
    }

    // 3. Redibujar todo el escenario
    dibujarTodo();
}

function iniciarJuego() {
    if (!intervaloSerpiente) {
        document.getElementById("estado").textContent = "Jugando";
        document.getElementById("mensaje").textContent = "¡El juego ha comenzado!";
        intervaloSerpiente = setInterval(moverSerpiente, 300); // Velocidad del juego (milisegundos)
    }
}

function pausarJuego() {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    document.getElementById("estado").textContent = "Pausado";
    document.getElementById("mensaje").textContent = "Juego pausado.";
}

function reiniciarJuego() {
    pausarJuego();
    serpiente = [
        { x: 3, y: 3 },
        { x: 2, y: 3 },
        { x: 1, y: 3 }
    ];
    direccionActual = "derecha";
    puntaje = 0;
    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("estado").textContent = "Listo";
    document.getElementById("mensaje").textContent = "Presiona iniciar para comenzar.";
    generarComida();
    dibujarTodo();
}