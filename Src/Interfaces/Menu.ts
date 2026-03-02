import PromptSync from "prompt-sync";
import { ServicioHorarios } from "../Aplicación/Servicios.ts/ServicioHorarios";
import { ServicioEvaluaciones } from "../Aplicación/Servicios.ts/ServicioEvaluaciones";
import { Docente } from "../Dominio/Modelos/Docente";
import { Curso } from "../Dominio/Modelos/Curso";
import { Horario } from "../Dominio/Modelos/Horario";
import { EvaluacionAcademica } from "../Dominio/Modelos/EvaluacionAcademica";
import { TipoEvaluacion } from "../Dominio/Enums/TipoEvaluacion";
import { EstadoEvaluacion } from "../Dominio/Enums/EstadoEvaluacion";
import { ServicioReportes } from "../Aplicación/Servicios.ts/ServicioReportes";

const prompt = PromptSync();

export class Menu {

    private docentes: Docente[] = [];
    private cursos: Curso[] = [];

    constructor(
        private servicioHorarios: ServicioHorarios,
        private servicioEvaluaciones: ServicioEvaluaciones
    ){}

    iniciar(): void {
        
        let opcion: number;

        do {

            console.log("====== SISTEMA ACADEMICO ======");
            console.log("1. Crear Docente");
            console.log("2. Crear Curso");
            console.log("3. Crear Horario");
            console.log("4. Crear Evaluacion");
            console.log("5. Ver Evaluaciones");
            console.log("6. Ver Horarios");
            console.log("7. Ver Alertas");
            console.log("8. Eliminar");
            console.log("9. Modificar Docente en Horario");
            console.log("10. Modificar Curso en Horario");
            console.log("0. Salir");
            
            opcion = Number(prompt("Seleccione una Opcion: "));

            if(isNaN(opcion)) {
                console.log("Error: Debe ingresar un numero.");
                continue;
            }

            switch (opcion) {
                case 1:
                    const dni = prompt("DNI: ");
                    const nombre = prompt("Nombre: ");
                    const correo = prompt("Correo: ");
                    const especialidad = prompt("Especialidad: ");

                    const docente = new Docente(dni, nombre, correo, especialidad);
                    this.docentes.push(docente);

                    console.log("Docente creado.");
                    break;
                
                case 2:
                    if (this.docentes.length === 0) {
                        console.log("Primero debe crear un docente.");
                        break;
                    }

                    const idCurso = Number(prompt("ID curso: "));
                    const nombreCurso = prompt("Nombre curso: ");
                    const creditos = Number(prompt("Creditos: "));

                    console.log("Seleccione docente:");
                    this.docentes.forEach((d, i) => {
                        console.log(`${i + 1}. ${d.getResumen()}`);
                    });

                    const indiceDoc = Number(prompt("Seleccione: ")) - 1;
                    const docenteSeleccionado = this.docentes[indiceDoc];

                    if(!docenteSeleccionado) {
                        console.log("Docente invalido.");
                        break;
                    }

                    const curso = new Curso (
                        idCurso,
                        nombreCurso,
                        docenteSeleccionado,
                        creditos
                    );

                    this.cursos.push(curso);

                    console.log("Curso creado.");
                    break;

                case 3:
                    if (this.cursos.length === 0) {
                        console.log("Primero debe crear un curso.");
                        break;
                    }

                    const idHorario = Number(prompt("ID horario: "));
                    const dia = prompt("Dia: ");
                    const inicio = prompt("Hora inicio (HH:MM): ");
                    const fin = prompt("Hora fin (HH:MM): ");
                    const aula = prompt("Aula: ");

                    console.log("Seleccione curso:");
                    this.cursos.forEach((c, i) => {
                        console.log(`${i + 1}. ${c.getResumen()}`);
                    });

                    const indiceCurso = Number(prompt("Seleccione: ")) - 1;
                    const cursoSel = this.cursos[indiceCurso];

                    if(!cursoSel) {
                        console.log("Curso invalido");
                        break;
                    }

                    const docenteCurso = cursoSel.getDocente();

                    const horario = new Horario(
                        idHorario,
                        dia,
                        inicio,
                        fin,
                        aula,
                        docenteCurso,
                        cursoSel
                    );

                    this.servicioHorarios.agregarHorario(horario);
                    break;

                case 4:
                    const horarios = this.servicioHorarios.getHorarios();

                    if (horarios.length === 0) {
                        console.log("Primero debe crear un horario.");
                        break;
                    }

                    const idEv = Number(prompt("ID evaluacion: "));
                    const titulo = prompt("Titulo: ");
                    const fecha = new Date(prompt("Fecha (YYYY-MM-DD): "));
                    const duracion = Number(prompt("Duracion minutos: "));

                    console.log("Seleccione horario:");
                    horarios.forEach((h, i) => {
                        console.log(`${i + 1}. ${h.getResumen()}`);
                    });

                    const indiceHorario = Number(prompt("Seleccione: ")) - 1;
                    const horarioSel = horarios[indiceHorario];

                    if(!horarioSel) {
                        console.log("Horario invalido");
                        break;
                    }

                    const evaluacion = new EvaluacionAcademica(
                        idEv,
                        titulo,
                        TipoEvaluacion.EXAMEN,
                        fecha,
                        duracion,
                        EstadoEvaluacion.PROGRAMADA,
                        horarioSel
                    );

                    this.servicioEvaluaciones.agregarEvaluacion(evaluacion);
                    console.log("Evaluacion creada.");
                    break;

                case 5: {

                    ServicioReportes.imprimirListaReportes(
                        this.servicioEvaluaciones.getEvaluaciones()
                    );
                    break;    
                }
                case 6: {
                    ServicioReportes.imprimirListaReportes(
                        this.servicioHorarios.getHorarios()
                    );
                    break;
                }
                case 7:
                    this.servicioEvaluaciones.verificarAlertas();
                    this.servicioEvaluaciones.verificarConflictos();
                    this.servicioEvaluaciones.listarAlertasActivas();
                    break;

                case 8:
                    console.log("1. Eliminar Evaluacion.");
                    console.log("2. Eliminar Horario.");

                    const opcionEliminar = Number(prompt("Selecciones opcion"));
                    const idEliminar = Number(prompt("Ingrese ID: "));

                    switch(opcionEliminar) {
                        case 1:
                            this.servicioEvaluaciones.eliminarEvaluacion(idEliminar);
                            console.log("Evaluacion eliminada.");
                            break;
                        case 2:
                            this.servicioHorarios.eliminarHorario(idEliminar);
                            console.log("Horario eliminado.");
                            break;
                        default:
                            console.log("Opcion invalida.");
                            
                    }
                    break;

                case 9:
                    const idHorarioDoc = Number(prompt("ID del horario: "));
                    const nuevoNombre = prompt("Nuevo nombre (enter para omitir): ");
                    const nuevoCorreo = prompt("Nuevo correo (enter para omitir): ");
                    const nuevaEspecialidad = prompt("Nueva especialidad (enter para omitir): ");

                    this.servicioHorarios.modificarDocente(
                        idHorarioDoc,
                        nuevoNombre || undefined,
                        nuevoCorreo || undefined,
                        nuevaEspecialidad || undefined
                    );

                    console.log("Docente actualizado.");
                    break;

                case 10:
                    const idHorarioCurso = Number(prompt("ID del horario: "));
                    const nuevoNombreCurso = prompt("Nuevo nombre curso (enter para omitir): ");
                    const nuevosCreditosTexto = prompt("Nuevos creditos (enter para omitir): ");

                    const nuevosCreditos = nuevosCreditosTexto
                        ? Number(nuevosCreditosTexto)
                        : undefined;

                    this.servicioHorarios.modificarCurso(
                        idHorarioCurso,
                        nuevoNombreCurso || undefined,
                        nuevosCreditos
                    );

                    console.log("Curso actualizado.");
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