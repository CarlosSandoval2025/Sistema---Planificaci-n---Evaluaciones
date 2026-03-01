import { IReportable } from "../Interfaces/IReportable";

export class AlertaConflicto implements IReportable {

    private id: number;
    private mensaje: string;
    private fechaGeneracion: Date;
    private tipo: string;
    private activa: boolean;

    constructor(
        id: number,
        mensaje: string,
        fechaGeneracion: Date,
        tipo: string,
        activa: boolean
    ) {
        this.id = id;
        this.mensaje = mensaje;
        this.fechaGeneracion = fechaGeneracion;
        this.tipo = tipo;
        this.activa = activa;
    }

    getId(): number {
        return this.id;
    }

    getMensaje(): string {
        return this.mensaje;
    }

    getFechaGeneracion(): Date {
        return this.fechaGeneracion;
    }

    getTipo(): string {
        return this.tipo;
    }

    estaActiva(): boolean {
        return this.activa;
    }

    desactivar(): void {
        this.activa = false;
    }

    getResumen(): string {
        return `[${this.tipo}] ${this.mensaje} - ${this.fechaGeneracion.toLocaleString()}`;
    }
}