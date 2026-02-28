import { EvaluacionAcademica } from "../Modelos/EvaluacionAcademica.js";
import { EstadoEvaluacion } from "../Modelos/EstadoEvaluacion.js";
import { Curso } from "../Modelos/Curso.js";
import { AlertaConflicto } from "../Modelos/AlertaConflicto.js";

export class ServicioEvaluaciones {

    private evaluaciones: EvaluacionAcademica[] = [];
    private alertas: AlertaConflicto[] = [];
    private contadorAlertas: number = 1;

    agregarEvaluacion(evaluacion: EvaluacionAcademica): void {
        this.evaluaciones.push(evaluacion);
    }

    listarEvaluaciones(): void {
        if (this.evaluaciones.length === 0) {
            console.log("No hay evaluaciones registradas.");
            return;
        }

        this.evaluaciones.forEach((ev, index) => {
            console.log("\nEvaluación #" + (index + 1));
            console.log(ev.getResumen());
        });
    }

    cambiarEstado(id: number, nuevoEstado: EstadoEvaluacion): void {
        const evaluacion = this.evaluaciones.find(e => e.getId() === id);

        if (evaluacion) {
            evaluacion.setEstado(nuevoEstado);
            console.log(`Estado de "${evaluacion.getTitulo()}" actualizado a ${nuevoEstado}.`);
        } else {
            console.log("Evaluación no encontrada.");
        }
    }

    reprogramarEvaluacion(id: number, nuevaFecha: Date): void {
        const evaluacion = this.evaluaciones.find(e => e.getId() === id);

        if (!evaluacion) {
            console.log("Evaluación no encontrada.");
            return;
        }

        evaluacion.reprogramar(nuevaFecha);
        console.log(`Evaluación "${evaluacion.getTitulo()}" reprogramada correctamente.`);
    }

    verificarAlertas(): void {

        this.evaluaciones.forEach(e => {

            const resultado = e.verificarAlerta();

            if (resultado !== null) {

                const alerta = new AlertaConflicto(
                    this.contadorAlertas++,
                    `Alerta para ${e.getTitulo()} - ${resultado}`,
                    new Date(),
                    "FECHA",
                    true
                );

                this.alertas.push(alerta);
            }

        });
    }
    
    verificarConflictos(): void {

        for (let i = 0; i < this.evaluaciones.length; i++) {
            for (let j = i + 1; j < this.evaluaciones.length; j++) {

                const ev1 = this.evaluaciones[i]!;
                const ev2 = this.evaluaciones[j]!;

                const mismaFecha =
                    ev1.getFecha().toDateString() === ev2.getFecha().toDateString();

                const mismoDia =
                    ev1.getHorario().getDia() === ev2.getHorario().getDia();

                const mismaAula =
                    ev1.getHorario().getAula() === ev2.getHorario().getAula();

                const inicio1 = ev1.getHorario().getHoraInicio();
                const fin1 = ev1.getHorario().getHoraFin();
                const inicio2 = ev2.getHorario().getHoraInicio();
                const fin2 = ev2.getHorario().getHoraFin();

                const cruceHoras = inicio1 < fin2 && fin1 > inicio2;

                if (mismaFecha && mismoDia && mismaAula && cruceHoras) {

                    const alerta = new AlertaConflicto(
                        this.contadorAlertas++,
                        `Conflicto entre ${ev1.getTitulo()} y ${ev2.getTitulo()}`,
                        new Date(),
                        "CONFLICTO",
                        true
                    );

                    this.alertas.push(alerta);
                }
            }
        }
    }

    listaAlertasActivas(): void {
        const activas = this.alertas.filter(a => a.estaActiva());

        if(activas.length === 0){
            console.log("No hay alertas activas.");
            return;
        }

        console.log("==== ALERTAS ACTIVAS ====");

        activas.forEach((alerta, index) => {
            console.log("\nAlerta #" + (index + 1));
            console.log(alerta.getResumen());
        });
    }

    consultarPorCurso(curso: Curso): void {

        const evaluacionesCurso = this.evaluaciones.filter(ev =>
            ev.getHorario().getCurso().getId() === curso.getId()
        );

        if (evaluacionesCurso.length === 0) {
            console.log(`No hay evaluaciones registradas para el curso ${curso.getResumen()}`);
            return;
        }

        console.log(`Evaluaciones del curso: ${curso.getResumen()}`);

        evaluacionesCurso.forEach(ev => {
            console.log("----------------------");
            console.log(ev.getResumen());
        });
    }

    consultarPorRangoFechas(fechaInicio: Date, fechaFin: Date): void {

        const filtradas = this.evaluaciones.filter(ev => {
            const fecha = ev.getFecha();
            return fecha >= fechaInicio && fecha <= fechaFin;
        });

        if (filtradas.length === 0) {
            console.log("No hay evaluaciones en ese rango");
            return;
        }

        console.log("Evaluaciones en el rango.");

        filtradas.forEach(ev => {
            console.log("-----------------------");
            console.log(ev.getResumen());
        });
    }
}