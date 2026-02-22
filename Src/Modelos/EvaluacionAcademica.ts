import { Horario } from "./Horario.js";
import { TipoEvaluacion} from "./TipoEvaluacion.js";
import { EstadoEvaluacion } from "./EstadoEvaluacion.js";


export class EvaluacionAcademica{
    private id: number;
    private titulo: string;
    private tipo: TipoEvaluacion;
    private fecha: Date;
    private duracionMin: number;
    private estado: EstadoEvaluacion;
    private horario: Horario;

    constructor(id: number, titulo: string, tipo: TipoEvaluacion, fecha: Date, duracionMin: number, estado: EstadoEvaluacion, horario: Horario){
        this.id = id;
        this.titulo = titulo;
        this.tipo = tipo;
        this.fecha = fecha;
        this.duracionMin = duracionMin;
        this.estado = estado;
        this.horario = horario;
    } 

    getResumen(): string{
        return this.titulo + "\n" + "Tipo: " + this.tipo + "\n" + "Fecha: " + this.fecha.toLocaleDateString + "\n" +
        "Duracion: " + this.duracionMin + "min\n" + "Estado: " + this.estado;
    }

}