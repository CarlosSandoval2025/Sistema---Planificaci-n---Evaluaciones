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
    private historialCambios: string[] = [];

    constructor(id: number, titulo: string, tipo: TipoEvaluacion, fecha: Date, duracionMin: number, estado: EstadoEvaluacion, horario: Horario){
        this.id = id;
        this.titulo = titulo;
        this.tipo = tipo;
        this.fecha = fecha;
        this.duracionMin = duracionMin;
        this.estado = estado;
        this.horario = horario;
        this.historialCambios = [];
    } 

    getResumen(): string{
        return this.titulo + "\n" + "Tipo: " + this.tipo + "\n" + "Fecha: " + this.fecha.toLocaleDateString() + "\n" +
        "Duracion: " + this.duracionMin + "min\n" + "Estado: " + this.estado;
    }

    reprogramar (nuevaFecha: Date): void {
        const fechaAnterior = this.fecha.toLocaleDateString();
    const fechaNueva = nuevaFecha.toLocaleDateString();

    this.fecha = nuevaFecha;
    this.estado = EstadoEvaluacion.REPROGRAMADA;

    this.historialCambios.push(
        `Reprogramada de ${fechaAnterior} a ${fechaNueva}`);
    }

    verHistorial(): void {
        if(this.historialCambios.length === 0){
            console.log("No hay cambios registrados.");
            return;
        }

        console.log("Historial de cambios: ");
        this.historialCambios.forEach((cambio, i) => {
            console.log((i + 1) + ". " + cambio);});
    }
}

