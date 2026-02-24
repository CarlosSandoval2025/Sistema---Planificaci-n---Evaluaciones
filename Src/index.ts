import promptSync from "prompt-sync";
const prompt = promptSync();

import { ServicioHorarios } from "./Servicios/ServicioHorarios.js";
import { ServicioEvaluaciones } from "./Servicios/ServicioEvaluaciones.js";
import { EvaluacionAcademica } from "./Modelos/EvaluacionAcademica.js";
import { EstadoEvaluacion } from "./Modelos/EstadoEvaluacion.js";
import { TipoEvaluacion } from "./Modelos/TipoEvaluacion.js";
import { Horario } from "./Modelos/Horario.js";

// luego aquí importarás tus servicios
// import { menuRegistros } from "./Servicios/MenuRegistros.js";

function menuPrincipal(): void {
    let opcion: string = "";

    do {
        console.log("\n===== SISTEMA DE EVALUACIONES =====");
        console.log("1. Registros");
        console.log("2. Evaluaciones");
        console.log("3. Horarios");
        console.log("4. Reportes");
        console.log("0. Salir");

        opcion = prompt("Seleccione opcion: ");

        switch (opcion) {
            case "1":
                console.log(">> Ir a módulo REGISTROS");
                // menuRegistros();   ← luego lo conectas
                break;

            case "2":
                console.log(">> Módulo evaluaciones (pendiente)");
                break;

            case "3":
                console.log(">> Módulo horarios (pendiente)");
                break;

            case "4":
                console.log(">> Módulo reportes (pendiente)");
                break;

            case "0":
                console.log("Saliendo...");
                break;

            default:
                console.log("Opción inválida");
        }

    } while (opcion !== "0");
}

menuPrincipal();

// ===== PRUEBA TEMPORAL =====
function pruebaServicio(): void {
    const servicio = new ServicioEvaluaciones();

    const horario = new Horario(1, "Lunes", "08:00", "10:00", "A101");

    const evaluacion = new EvaluacionAcademica(
        1,
        "Examen Parcial",
        TipoEvaluacion.EXAMEN,
        new Date(),
        120,
        EstadoEvaluacion.PROGRAMADA,
        horario
    );

    const evaluacion2 = new EvaluacionAcademica(
    2,
    "Examen Final",
    TipoEvaluacion.EXAMEN,
    new Date(),
    120,
    EstadoEvaluacion.PROGRAMADA,
    horario
    );

    servicio.agregarEvaluacion(evaluacion);
    servicio.agregarEvaluacion(evaluacion2);

    console.log("\n--- LISTADO INICIAL ---");
    servicio.listarEvaluaciones();

    console.log("\n--- REPROGRAMANDO ---");
    servicio.reprogramarEvaluacion(1, new Date());

    console.log("\n--- LISTADO DESPUES DE REPROGRAMAR ---");
    servicio.listarEvaluaciones();

    console.log("\n--- HISTORIAL ---");
    evaluacion.verHistorial();

    console.log("\n--- ALERTAS ---");
    servicio.verificarAlertas();

    console.log("\n--- CONFLICTOS ---");
    servicio.verificarConflictos();
}

pruebaServicio();

function pruebaHorarios(): void {

    const servicio = new ServicioHorarios();

    const h1 = new Horario(1, "Lunes", "08:00", "10:00", "A101");
    const h2 = new Horario(2, "Martes", "10:00", "12:00", "B202");

    servicio.agregarHorario(h1);
    servicio.agregarHorario(h2);

    servicio.listarHorarios();
}

pruebaHorarios();