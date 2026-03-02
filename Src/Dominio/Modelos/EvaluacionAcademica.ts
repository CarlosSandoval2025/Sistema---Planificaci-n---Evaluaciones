import { Horario } from "./Horario";
import { TipoEvaluacion } from "../Enums/TipoEvaluacion";
import { EstadoEvaluacion } from "../Enums/EstadoEvaluacion";
import { IReportable } from "../Interfaces/IReportable";

export class EvaluacionAcademica implements IReportable {
    private id: number;
    private titulo: string;
    private tipo: TipoEvaluacion;
    private fecha: Date;
    private duracionMin: number;
    private estado: EstadoEvaluacion;
    private horario: Horario;
    private historialCambios: string[];

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

    static desdeJSON(obj: any): EvaluacionAcademica {
        const horario = Horario.desdeJSON(obj.horario);

        const evaluacion = new EvaluacionAcademica(
            obj.id,
            obj.titulo,
            obj.tipo as TipoEvaluacion,
            new Date(obj.fecha),
            obj.duracionMin,
            obj.estado as EstadoEvaluacion,
            horario
        );

        if (obj.historialCambios) {
            evaluacion.historialCambios = obj.historialCambios;
        }

        return evaluacion;
    }

    getId(): number {
        return this.id;
    }

    getTitulo(): string {
        return this.titulo;
    }

    getFecha(): Date {
        return this.fecha;
    }

    getHorario(): Horario {
        return this.horario;
    }

    getEstado(): EstadoEvaluacion {
        return this.estado;
    }

    setEstado(nuevoEstado: EstadoEvaluacion): void {
        this.estado = nuevoEstado;
    }

    getResumen(): string {
        return (
            this.titulo +
            "\nTipo: " +
            this.tipo +
            "\nFecha: " +
            this.fecha.toLocaleDateString() +
            "\nDuración: " +
            this.duracionMin +
            "min\nEstado: " +
            this.estado
        );
    }

    reprogramar(nuevaFecha: Date): void {
        const fechaAnterior = this.fecha.toLocaleDateString();
        const fechaNueva = nuevaFecha.toLocaleDateString();

        this.fecha = nuevaFecha;
        this.estado = EstadoEvaluacion.REPROGRAMADA;

        this.historialCambios.push(
            `Reprogramada de ${fechaAnterior} a ${fechaNueva}`
        );
    }

    verHistorial(): void {
        if (this.historialCambios.length === 0) {
            console.log("No hay cambios registrados.");
            return;
        }

        console.log("Historial de cambios:");
        this.historialCambios.forEach((cambio, i) => {
            console.log((i + 1) + ". " + cambio);
        });
    }

    verificarAlerta(): string | null {
        
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        const fechaEval = new Date(this.fecha);
        fechaEval.setHours(0, 0, 0, 0);

        const diferenciaMs = fechaEval.getTime() - hoy.getTime();
        const diferenciaDias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

        if(diferenciaDias < 0){
            return "VENCIDA";
        }

        if(diferenciaDias <= 7) {
            return `PROXIMA: ${diferenciaDias} dias`;
        }

        return null;
    }
}

