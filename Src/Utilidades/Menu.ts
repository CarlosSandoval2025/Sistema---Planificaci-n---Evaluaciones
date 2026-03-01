import PromptSync from "prompt-sync";
import { ServicioHorarios } from "../Servicios/ServicioHorarios";
import { ServicioEvaluaciones } from "../Servicios/ServicioEvaluaciones";

const prompt = PromptSync();

export class Menu {

    constructor(
        private servicioHorarios: ServicioHorarios,
        private servicioEvaluaciones: ServicioEvaluaciones
    ){}

    iniciar(): void {
        
        let opcion: number;

        do {

            console.log("====== SISTEMA ACADEMICO ======");
            console.log("1. Modulo de Cursos");
            console.log("2. Modulo de Evaluaciones");
            console.log("3. Modulo de Horarios");
            console.log("4. Modulo de Calendario");
            console.log("5. Modulo de Alertas de Conflicto");            
            console.log("0. Salir");
            
            opcion = Number(prompt("Seleccione una Opcion: "));

            if(isNaN(opcion)) {
                console.log("Error: Debe ingresar un numero.");
                continue;
            }

            switch (opcion) {
                case 1:
                    console.log("Modulo de Curso en construccion.");
                    break;
                
                case 2:
                    this.moduloEvaluaciones();
                    break;

                case 3:
                    this.servicioHorarios.listarHorarios();
                    break;

                case 4:
                    this.moduloCalendario();
                    break;

                case 5:
                    this.servicioEvaluaciones.verificarAlertas();
                    this.servicioEvaluaciones.verificarConflictos();
                    this.servicioEvaluaciones.listarAlertasActivas();
                    break;

                case 0:
                    console.log("Saliendo del sistema...");
                    break;

                default:
                    console.log("Opcion invalida.");
            }
        }
        while (opcion !== 0);
    }

    private moduloEvaluaciones(): void {

        console.log("\n -------- MODULO DE EVALUACIONES --------");
        console.log("1. Listar Evaluaciones.");
        console.log("2. Cambiar Estado.");
        console.log("3. Reprogramar Evaluacion.");
        console.log("0. Volver.");

        const op = Number(prompt("Seleccione: "));

        if(isNaN(op)) {
            console.log("Error: Ingrese un numero valido.");
        }

        switch (op) {
            
            case 1:
                this.servicioEvaluaciones.listarEvaluaciones();
                break;

            case 2:
                const id = Number(prompt("ID evaluacion: "));
                console.log("1.Programada 2.Reprogramada 3.Realizada 4.Cancelada");
                const est = Number(prompt("Selecione estado: "));

                const estados = [
                    "Programada",
                    "Reprogramada",
                    "Realizada",
                    "Cancelada"
                ];

                break;

            case 3:
                const idRep = Number(prompt("ID evaluacion: "));
                const fechaTexto = prompt("Nueva fecha(DD-MM-AAAA): ");
                this.servicioEvaluaciones.reprogramarEvaluacion(idRep, new Date(fechaTexto));
                break;
        }
    }

    private moduloCalendario(): void {

        console.log("\n -------- CONSULTA POR RANGO DE FECHAS --------");

        const inicio = prompt("Fecha inicio (DD-MM-AAAA): ");
        const fin = prompt("Fecha fin(DD-MM-AAAA): " );

        this.servicioEvaluaciones.consultarPorRangoFechas(
            new Date(inicio),
            new Date(fin)
        );
    }
}