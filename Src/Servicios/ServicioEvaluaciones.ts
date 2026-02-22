import { EvaluacionAcademica } from "../Modelos/EvaluacionAcademica.js";
import { EstadoEvaluacion } from "../Modelos/EstadoEvaluacion.js";

export class ServicioEvaluaciones {
    private evaluaciones: EvaluacionAcademica[] = [];

    agregarEvaluacion(evaluacion: EvaluacionAcademica): void {
        this.evaluaciones.push(evaluacion);
    }

    listarEvaluaciones(): void {
        this.evaluaciones.forEach((ev, index) => {
            console.log("\nEvaluacion #" + (index + 1));
            console.log(ev.getResumen());
        });
    }

    cambiarEstado(id: number, nuevoEstado: EstadoEvaluacion): void {
        const evaluacion = this.evaluaciones.find(e => (e as any).id === id);
        if (evaluacion) {
            (evaluacion as any).estado = nuevoEstado;
        }
    }

    reprogramarEvaluacion(id: number, nuevaFecha: Date): void {
        const evaluacion = this.evaluaciones.find(e => (e as any).id === id);

        if(!evaluacion) {
            console.log("Evaluacion no encontrada.");
            return;
        }

        evaluacion.reprogramar(nuevaFecha);
        console.log("Evaluacion reprogramada correctamente,");
    }
}