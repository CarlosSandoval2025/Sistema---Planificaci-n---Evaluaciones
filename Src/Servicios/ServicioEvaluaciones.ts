import { EvaluacionAcademica } from "../Modelos/EvaluacionAcademica";
import { EstadoEvaluacion } from "../Modelos/EstadoEvaluacion";
import { Curso } from "../Modelos/Curso";
import { AlertaConflicto } from "../Modelos/AlertaConflicto";

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
                
                const mensaje = `Alerta para ${e.getTitulo()} - ${resultado}`;

                const yaExiste = this.alertas.some(a => 
                    a.getMensaje() === mensaje &&
                    a.estaActiva()
                );

                if(!yaExiste) {
                    const alerta = new AlertaConflicto(
                        this.contadorAlertas ++,
                        mensaje,
                        new Date(),
                        "FECHA",
                        true
                    );

                    this.alertas.push(alerta);
                }
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

                    const mensaje = `Conflicto entre ${ev1.getTitulo()} y ${ev2.getTitulo()}`;

                    const yaExiste = this.alertas.some(a =>
                        a.getMensaje() === mensaje &&
                        a.estaActiva()
                    );

                    if(!yaExiste){
                        const alerta = new AlertaConflicto(
                            this.contadorAlertas++,
                            mensaje,
                            new Date(),
                            "CONFLICTO",
                            true
                        );

                        this.alertas.push(alerta);
                    }
                }
            }
        }
    }

    listarAlertasActivas(): void {
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

    generarReportePorCurso(curso: Curso): EvaluacionAcademica[] {
        return this.evaluaciones.filter(ev =>
            ev.getHorario().getCurso().getId() === curso.getId()
        );
    }

    generarReportePorRangoFecha(fechaInicio: Date, fechaFin: Date): EvaluacionAcademica[] {
        return this.evaluaciones.filter(ev => {
            const fecha = ev.getFecha();
            return fecha >= fechaInicio && fecha <= fechaFin; 
        });
    }

    ConstruirReporte(lista: EvaluacionAcademica[]): string {
        if(lista.length === 0) {
            return "No hay evaluaciones para el reporte.";
        }

        let resultado = "===== REPORTE ACADEMICO =====\n";

        lista.forEach((ev, index) => {
                resultado += `\nEvaluacion #${index + 1}\n`;
                resultado += ev.getResumen() + "\n";
                resultado += "-------------------------\n";
        });

        return resultado;
    }

    getEvaluaciones(): EvaluacionAcademica[] {
        return this.evaluaciones;
    }
}