import promptSync from "prompt-sync";
const prompt = promptSync();
import { ServicioEvaluaciones } from "./Servicios/ServicioEvaluaciones.js";
import { EvaluacionAcademica } from "./Modelos/EvaluacionAcademica.js";
import { EstadoEvaluacion } from "./Modelos/EstadoEvaluacion.js";
import { TipoEvaluacion } from "./Modelos/TipoEvaluacion.js";
import { Horario } from "./Modelos/Horario.js";
// luego aquí importarás tus servicios
// import { menuRegistros } from "./Servicios/MenuRegistros.js";
function menuPrincipal() {
    let opcion = "";
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
function pruebaServicio() {
    const servicio = new ServicioEvaluaciones();
    const horario = new Horario(1, "Lunes", "08:00", "10:00", "A101");
    const evaluacion = new EvaluacionAcademica(1, "Examen Parcial", TipoEvaluacion.EXAMEN, new Date(), 120, EstadoEvaluacion.PROGRAMADA, horario);
    servicio.agregarEvaluacion(evaluacion);
    servicio.listarEvaluaciones();
}
pruebaServicio();
//# sourceMappingURL=index.js.map