// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// Constante para el tamaño de cada celda de la cuadrícula
const TAMANIO_CELDA = 25;

// Arreglo que representa el cuerpo de la serpiente (coordenadas de la cuadrícula)
const serpiente = [
    { x: 3, y: 3 }, // Cabeza (diferenciada por color)
    { x: 2, y: 3 }, // Cuerpo
    { x: 1, y: 3 }  // Cuerpo
];

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
    ctx.strokeStyle = "#1e293b"; // Color sutil para las líneas de la cuadrícula
    ctx.lineWidth = 1;

    // 1. Bucle para pintar las líneas verticales
    for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // 2. Bucle para pintar las líneas horizontales
    for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Función para pintar una celda individual basada en coordenadas de la cuadrícula
function pintarParte(lineax, lineay, esCabeza = false) {
    // Calculamos la posición real multiplicando por el tamaño de la celda
    const xReal = lineax * TAMANIO_CELDA;
    const yReal = lineay * TAMANIO_CELDA;

    // Color de relleno (Amarillo para la cabeza, Rojo para el cuerpo)
    ctx.fillStyle = esCabeza ? "#facc15" : "#ef4444";
    ctx.fillRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);

    // Color y trazo del borde del bloque
    ctx.strokeStyle = "#b91c1c";
    ctx.strokeRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);
}

// Función para recorrer y pintar toda la serpiente
function pintarSerpiente() {
    for (let i = 0; i < serpiente.length; i++) {
        const parte = serpiente[i];
        // Si el índice es 0, es la cabeza
        const esCabeza = (i === 0);
        pintarParte(parte.x, parte.y, esCabeza);
    }
}

function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero(); 
    pintarSerpiente(); // Dibujamos la serpiente en el canvas
}

// Funciones de control de botones
function cambiarDireccion(dir) {
    console.log("Dirección cambiada a: " + dir);
}

function pausarJuego() {
    console.log("Juego pausado");
}

function iniciarJuego() {
    console.log("Iniciando juego...");
}

function reiniciarJuego() {
    console.log("Reiniciando juego...");
}