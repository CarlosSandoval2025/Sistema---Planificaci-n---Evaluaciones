import { Horario } from "./Horario.js";
import { TipoEvaluacion } from "./TipoEvaluacion.js";
import { EstadoEvaluacion } from "./EstadoEvaluacion.js";
export declare class EvaluacionAcademica {
    private id;
    private titulo;
    private tipo;
    private fecha;
    private duracionMin;
    private estado;
    private horario;
    constructor(id: number, titulo: string, tipo: TipoEvaluacion, fecha: Date, duracionMin: number, estado: EstadoEvaluacion, horario: Horario);
    getResumen(): string;
}
//# sourceMappingURL=EvaluacionAcademica.d.ts.map