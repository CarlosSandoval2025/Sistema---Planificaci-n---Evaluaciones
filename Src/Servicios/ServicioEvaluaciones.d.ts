import { EvaluacionAcademica } from "../Modelos/EvaluacionAcademica.js";
import { EstadoEvaluacion } from "../Modelos/EstadoEvaluacion.js";
export declare class ServicioEvaluaciones {
    private evaluaciones;
    agregarEvaluacion(evaluacion: EvaluacionAcademica): void;
    listarEvaluaciones(): void;
    cambiarEstado(id: number, nuevoEstado: EstadoEvaluacion): void;
}
//# sourceMappingURL=ServicioEvaluaciones.d.ts.map