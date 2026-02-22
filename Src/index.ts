import promptSync from "prompt-sync";
const prompt = promptSync();

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