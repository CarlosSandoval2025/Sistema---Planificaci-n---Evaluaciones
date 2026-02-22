import { EvaluacionAcademica } from "../Modelos/EvaluacionAcademica.js";
import { EstadoEvaluacion } from "../Modelos/EstadoEvaluacion.js";
export class ServicioEvaluaciones {
    evaluaciones = [];
    agregarEvaluacion(evaluacion) {
        this.evaluaciones.push(evaluacion);
    }
    listarEvaluaciones() {
        this.evaluaciones.forEach((ev, index) => {
            console.log("\nEvaluacion #" + (index + 1));
            console.log(ev.getResumen());
        });
    }
    cambiarEstado(id, nuevoEstado) {
        const evaluacion = this.evaluaciones.find(e => e.id === id);
        if (evaluacion) {
            evaluacion.estado = nuevoEstado;
        }
    }
}
//# sourceMappingURL=ServicioEvaluaciones.js.map