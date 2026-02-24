import { EvaluacionAcademica } from "../Modelos/EvaluacionAcademica.js";
import { EstadoEvaluacion } from "../Modelos/EstadoEvaluacion.js";

export class ServicioEvaluaciones {
    private evaluaciones: EvaluacionAcademica[] = [];

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
        if (this.evaluaciones.length === 0) {
            console.log("No hay evaluaciones registradas.");
            return;
        }

        this.evaluaciones.forEach(e => {
            console.log("\nEvaluación: " + e.getTitulo());
            e.verificarAlerta();
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

                const mismaHora =
                    ev1.getHorario().getHoraInicio() === ev2.getHorario().getHoraInicio() &&
                    ev1.getHorario().getHoraFin() === ev2.getHorario().getHoraFin();

                const mismaAula =
                    ev1.getHorario().getAula() === ev2.getHorario().getAula();

                if (mismaFecha && mismoDia && mismaHora && mismaAula) {
                    console.log("\nCONFLICTO DETECTADO:");
                    console.log(`- ${ev1.getTitulo()} y ${ev2.getTitulo()}`);
                }
            }
        }
    }
}