// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// Constante para el tamaño de cada celda de la cuadrícula
const TAMANIO_CELDA = 25;

// Variables de configuración y estado del juego
let serpiente = [
    { x: 3, y: 3 },
    { x: 2, y: 3 },
    { x: 1, y: 3 }
];

let direccionActual = "derecha";
let proximaDireccion = "derecha"; // Evita errores de giro rápido
let intervaloSerpiente = null;
let puntaje = 0;
let velocidad = 250; // Velocidad inicial en milisegundos (Parte 4)
let juegoTerminado = false;

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

function pintarParte(lineax, lineay, esCabeza = false, esComida = false) {
    const xReal = lineax * TAMANIO_CELDA;
    const yReal = lineay * TAMANIO_CELDA;

    if (esComida) {
        ctx.fillStyle = "#38bdf8"; 
        ctx.strokeStyle = "#0284c7";
    } else {
        ctx.fillStyle = esCabeza ? "#facc15" : "#ef4444"; 
        ctx.strokeStyle = "#b91c1c";
    }

    ctx.fillRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);
    ctx.strokeRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
    for (let i = 0; i < serpiente.length; i++) {
        const parte = serpiente[i];
        const esCabeza = (i === 0);
        pintarParte(parte.x, parte.y, esCabeza, false);
    }
}

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
// MOVIMIENTO Y LÓGICA
// =========================

function moverDerecha() {
    const cabeza = serpiente[0];
    serpiente.unshift({ x: cabeza.x + 1, y: cabeza.y });
}

function moverIzquierda() {
    const cabeza = serpiente[0];
    serpiente.unshift({ x: cabeza.x - 1, y: cabeza.y });
}

function moverArriba() {
    const cabeza = serpiente[0];
    serpiente.unshift({ x: cabeza.x, y: cabeza.y - 1 });
}

function moverAbajo() {
    const cabeza = serpiente[0];
    serpiente.unshift({ x: cabeza.x, y: cabeza.y + 1 });
}

// Control de dirección con validación para evitar giro sobre sí misma
function cambiarDireccion(dir) {
    if (juegoTerminado) return;

    if (dir === "arriba" && direccionActual !== "abajo") proximaDireccion = "arriba";
    if (dir === "abajo" && direccionActual !== "arriba") proximaDireccion = "abajo";
    if (dir === "izquierda" && direccionActual !== "derecha") proximaDireccion = "izquierda";
    if (dir === "derecha" && direccionActual !== "izquierda") proximaDireccion = "derecha";
}

function generarComida() {
    const maxColumnas = canvas.width / TAMANIO_CELDA;
    const maxFilas = canvas.height / TAMANIO_CELDA;

    comida.x = Math.floor(Math.random() * maxColumnas);
    comida.y = Math.floor(Math.random() * maxFilas);
}

function atrapaComida() {
    const cabeza = serpiente[0];
    return cabeza.x === comida.x && cabeza.y === comida.y;
}

// Verificación de colisión con los bordes (Game Over)[cite: 35]
function validarColisionBordes() {
    const cabeza = serpiente[0];
    const maxColumnas = canvas.width / TAMANIO_CELDA;
    const maxFilas = canvas.height / TAMANIO_CELDA;

    if (cabeza.x < 0 || cabeza.x >= maxColumnas || cabeza.y < 0 || cabeza.y >= maxFilas) {
        return true; // Chocó con el borde
    }
    return false;
}

function moverSerpiente() {
    direccionActual = proximaDireccion;

    if (direccionActual === "derecha") moverDerecha();
    else if (direccionActual === "izquierda") moverIzquierda();
    else if (direccionActual === "arriba") moverArriba();
    else if (direccionActual === "abajo") moverAbajo();

    // Validar si choca contra los bordes (Game Over)
    if (validarColisionBordes()) {
        finalizarJuego();
        return;
    }

    if (atrapaComida()) {
        puntaje += 10;
        document.getElementById("puntaje").textContent = puntaje;
        generarComida();
        
        // Mejora opcional: Incrementar velocidad ligeramente al comer
        if (velocidad > 100) {
            velocidad -= 5;
            reiniciarIntervalo();
        }
    } else {
        serpiente.pop();
    }

    dibujarTodo();
}

function reiniciarIntervalo() {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = setInterval(moverSerpiente, velocidad);
}

function iniciarJuego() {
    if (!intervaloSerpiente && !juegoTerminado) {
        document.getElementById("estado").textContent = "Jugando";
        document.getElementById("mensaje").textContent = "¡Partida en curso!";
        intervaloSerpiente = setInterval(moverSerpiente, velocidad);
    }
}

function pausarJuego() {
    if (juegoTerminado) return;
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    document.getElementById("estado").textContent = "Pausado";
    document.getElementById("mensaje").textContent = "Juego pausado.";
}

function finalizarJuego() {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    juegoTerminado = true;
    document.getElementById("estado").textContent = "Game Over";
    document.getElementById("mensaje").textContent = "💥 ¡Te chocaste! Presiona Reiniciar.";
}

function reiniciarJuego() {
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    juegoTerminado = false;
    serpiente = [
        { x: 3, y: 3 },
        { x: 2, y: 3 },
        { x: 1, y: 3 }
    ];
    direccionActual = "derecha";
    proximaDireccion = "derecha";
    puntaje = 0;
    velocidad = 250;
    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("estado").textContent = "Listo";
    document.getElementById("mensaje").textContent = "Presiona iniciar para comenzar.";
    generarComida();
    dibujarTodo();
}