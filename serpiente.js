// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// Constante para el tamaño de cada celda de la cuadrícula
const TAMANIO_CELDA = 25;

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

function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero(); // Invocamos el tablero dentro del flujo de redibujado
}

// Funciones temporales para evitar errores en los botones del HTML antes de llegar a esas partes
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