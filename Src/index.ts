import promptSync from "prompt-sync";
const prompt = promptSync();

import { ServicioHorarios } from "./Servicios/ServicioHorarios";
import { ServicioEvaluaciones } from "./Servicios/ServicioEvaluaciones";
import { EvaluacionAcademica } from "./Modelos/EvaluacionAcademica";
import { EstadoEvaluacion } from "./Modelos/EstadoEvaluacion";
import { TipoEvaluacion } from "./Modelos/TipoEvaluacion";
import { Horario } from "./Modelos/Horario";
import { Docente } from "./Modelos/Docente";
import { Curso } from "./Modelos/Curso";

// luego aquí importarás tus servicios
// import { menuRegistros } from "./Servicios/MenuRegistros";

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

//menuPrincipal();

// ===== PRUEBA TEMPORAL =====
function pruebaServicio(): void {

    const servicio = new ServicioEvaluaciones();

    const docente1 = new Docente(
        "100000",
        "Juan Perez",
        "juan@uni.edu",
        "Matematica"
    );

    const curso1 = new Curso(
        1,
        "Matematica I",
        docente1,
        4
    );

    const horario = new Horario(
        1,
        "Lunes",
        "08:00",
        "10:00",
        "A101",
        docente1,
        curso1
    );

    const evaluacion1 = new  EvaluacionAcademica(
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
    servicio.agregarEvaluacion(evaluacion1);
    servicio.agregarEvaluacion(evaluacion2);

    console.log("\n--- LISTADO INICIAL ---");
    servicio.listarEvaluaciones();

    console.log("\n--- REPROGRAMANDO ---");
    servicio.reprogramarEvaluacion(1, new Date());

    console.log("\n--- LISTADO DESPUES DE REPROGRAMAR ---");
    servicio.listarEvaluaciones();


    console.log("\n--- ALERTAS ---");
    servicio.verificarAlertas();

    console.log("\n--- CONFLICTOS ---");
    servicio.verificarConflictos();
}

//pruebaServicio();

function pruebaHorarios(): void {

    const servicio = new ServicioHorarios();

    const docente1 = new Docente(
        "200000",
        "Juan Perez",
        "juan@uni.edu",
        "Matematica"
    );

    // AQUÍ SE CREA EL CURSO
    const curso1 = new Curso(
        1,
        "Matematica I",
        docente1,
        4
    );

    //AQUÍ PASA EL CURSO AL HORARIO
    const h1 = new Horario(
        1,
        "Lunes",
        "08:00",
        "10:00",
        "A101",
        docente1,
        curso1
    );

    const h2 = new Horario(
        2,
        "Lunes",
        "08:00",
        "10:00",
        "B202",
        docente1,
        curso1
    );

    servicio.agregarHorario(h1);
    servicio.agregarHorario(h2); // debe fallar por curso

    servicio.listarHorarios();
}
pruebaHorarios();