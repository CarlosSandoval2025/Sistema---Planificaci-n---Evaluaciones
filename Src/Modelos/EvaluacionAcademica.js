import { Horario } from "./Horario.js";
import { TipoEvaluacion } from "./TipoEvaluacion.js";
import { EstadoEvaluacion } from "./EstadoEvaluacion.js";
export class EvaluacionAcademica {
    id;
    titulo;
    tipo;
    fecha;
    duracionMin;
    estado;
    horario;
    constructor(id, titulo, tipo, fecha, duracionMin, estado, horario) {
        this.id = id;
        this.titulo = titulo;
        this.tipo = tipo;
        this.fecha = fecha;
        this.duracionMin = duracionMin;
        this.estado = estado;
        this.horario = horario;
    }
    getResumen() {
        return this.titulo + "\n" + "Tipo: " + this.tipo + "\n" + "Fecha: " + this.fecha.toLocaleDateString() + "\n" +
            "Duracion: " + this.duracionMin + "min\n" + "Estado: " + this.estado;
    }
}
//# sourceMappingURL=EvaluacionAcademica.js.map